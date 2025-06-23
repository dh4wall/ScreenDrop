'use server'

import { headers } from "next/headers"
import { apiFetch, getEnv, withErrorHandling } from "../utils"
import { auth } from "@/lib/auth"
import { BUNNY } from "@/constants"
import { db } from "@/drizzle/db"
import { videos } from "@/drizzle/schema"
import { revalidatePath } from "next/cache"
import aj from "@/lib/arcjet"
import { fixedWindow, request } from "@arcjet/next"

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEYS = {
    streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
    storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
}

//--->HELPER FUNCTION
const getSessionUserId = async (): Promise<string> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Unauthenticated");
    return session.user.id;
}

const revalidatePaths = (paths: string[]) => {
    paths.forEach((path) => revalidatePath(path))
}

const validatewithArcjet = async (fingerprint: string) => {
    const ratelimit=aj.withRule(
        fixedWindow({
            mode:"LIVE",
            window:"2m",
            max: 2,
            characteristics:['fingerprint']
        })
    )

    const req=await request();

    const decision= await  ratelimit.protect(req,{fingerprint});

    if(decision.isDenied())throw new Error("Rate limit exceeded. Please try again later.");
}





//--->SERVER ACTION
//enclosing it withError handling will open the witherror handling function in utils thus we dont need to implement try catch everywhere
export const getVideoUploadUrl = withErrorHandling(async () => {
    await getSessionUserId();
    const videoResponse = await apiFetch<BunnyVideoResponse>(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
        {
            method: "POST",
            bunnyType: "stream",
            body: { title: 'Temporary title', collectionId: "" }
        }
    );
    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;

    return {
        videoId: videoResponse.guid,
        uploadUrl,
        accessKey: ACCESS_KEYS.streamAccessKey
    }
})

export const getThumbnailUploadUrl = withErrorHandling(async (VideoId: string) => {
    const filename = `${Date.now()}-${VideoId}-thumbnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${filename}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${filename}`;
    return {
        uploadUrl,
        cdnUrl,
        accessKey: ACCESS_KEYS.storageAccessKey
    }
})

export const saveVideoDetails = withErrorHandling(async (VideoDetails: Omit<VideoDetails, 'videoUrl'>) => {
    const userId = await getSessionUserId();
    await validatewithArcjet(userId);
    await apiFetch(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${VideoDetails.videoId}`,
        {
            method: "POST",
            bunnyType: "stream",
            body: {
                title: VideoDetails.title,
                description: VideoDetails.description
            }
        }
    )
    await db.insert(videos).values({
        ...VideoDetails,
        videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${VideoDetails.videoId}`,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    revalidatePaths(['/']);

    return { videoId: VideoDetails.videoId }
})













