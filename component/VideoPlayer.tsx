"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { incrementVideoViews, getVideoProcessingStatus } from "@/lib/actions/video";
import { initialVideoState } from "@/constants";

const VideoPlayer = ({ videoUrl, className }: { videoUrl: string, className?: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState(initialVideoState);

  const videoId = videoUrl.split("/").pop() ?? ""; // Ensure videoId is always a string

  useEffect(() => {
    if (!videoId) return; // Early return if videoId is empty

    const checkProcessingStatus = async () => {
      const status = await getVideoProcessingStatus(videoId);
      setState((prev) => ({
        ...prev,
        isProcessing: !status.isProcessed,
      }));

      return status.isProcessed;
    };

    checkProcessingStatus();

    const intervalId = setInterval(async () => {
      const isProcessed = await checkProcessingStatus();
      if (isProcessed) {
        clearInterval(intervalId);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [videoId]);

  useEffect(() => {
    if (!videoId) return; // Early return if videoId is empty
    if (state.isLoaded && !state.hasIncrementedView && !state.isProcessing) {
      const incrementView = async () => {
        try {
          await incrementVideoViews(videoId);
          setState((prev) => ({ ...prev, hasIncrementedView: true }));
        } catch (error) {
          console.error("Failed to increment view count:", error);
        }
      };

      incrementView();
    }
  }, [videoId, state.isLoaded, state.hasIncrementedView, state.isProcessing]);

  return (
    <div className={cn("video-player", className)}>
      {state.isProcessing ? (
        <div><p>Processing video...</p></div>
      ) : (
        <iframe
          ref={iframeRef}
          src={videoUrl}
          loading="lazy"
          title="Video player"
          style={{ border: 0, zIndex: 50 }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          onLoad={() => setState((prev) => ({ ...prev, isLoaded: true }))}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
