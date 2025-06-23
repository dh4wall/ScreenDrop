"use client";
import FileInput from "@/component/FileInput";
import FormField from "@/component/FormField";
import { BUNNY, MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { getVideoUploadUrl, getThumbnailUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { duration } from "drizzle-orm/gel-core";
import { access } from "fs";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const uploadFiletoBunny=(file:File,uploadUrl:string,accessKey:string):Promise<void>=>{
  return fetch(uploadUrl,{
    method:"PUT",
    headers: {
      "Content-Type": file.type,
      "AccessKey": accessKey,
    },
    body: file,
      
  }).then((response)=>{
    if(!response.ok)throw new Error(`Failed to upload file`);
  })
}



const page = () => {

  const router=useRouter()
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [error, seterror] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const [videoDuration, setVideoDuration] = useState(0);
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail=useFileInput(MAX_THUMBNAIL_SIZE)

  useEffect(()=>{
    if(video.duration!== null||0){
      setVideoDuration(video.duration);
    }
    
  },[video.duration])


  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();
    setIsSubmitting(true);
    try{
      if(!video.file || !thumbnail.file){
        seterror(" upload video and thumbnail");
        return
      }
      if(!formData.title||!formData.description){
        seterror(" enter formdata and description")
        return;
      }

        
        //get upload url
        const {
          videoId,
          uploadUrl: videoUploadUrl,
          accessKey: videoAccessKey,
          
        }=await getVideoUploadUrl();

        if(!videoUploadUrl|| !videoAccessKey){
          throw new Error("Failed to get video upload credentials");

        }
        // upload video to BUNNY
        await uploadFiletoBunny(video.file!,videoUploadUrl,videoAccessKey);

        const {
          
          uploadUrl: thumbnailUploadUrl,
          accessKey: thumbnailAccessKey,
          cdnUrl: thumbnailCdnUrl,
        }=await getThumbnailUploadUrl(videoId);
        if(!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl){
          throw new Error("Failed to get thumbnail upload credentials");
        }
        // upload thumbail to db
        await uploadFiletoBunny(thumbnail.file!,thumbnailUploadUrl,thumbnailAccessKey);
        // attach thumbnail
        // create a new db entry tto store the metadata, video details...etc
        await saveVideoDetails({
          videoId,
          thumbnailUrl: thumbnailCdnUrl,
          ...formData,
          duration:videoDuration
        })
        

        router.push(`video/${videoId}`);
      }
    catch(error){
      console.log("Error Submitting From:",error)
    }finally{
      setIsSubmitting(false);
    }
  }
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}

      <form
        className="rounded-20 shadow-20 gap-6 w-full flex flex-col px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="enter video title"
        />
        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="describe your idea"
          as="textarea"
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput 
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />


        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          as="select"
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting? 'Uploading...':'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default page;



// { ...prevState, [name]: value }
// You're updating one field (like "title") in the formData object without losing the rest of the fields.

// 👇 Let's say this is your state before:
// ts
// Copy
// Edit
// formData = {
//   title: 'My video',
//   description: 'A test',
//   visibility: 'public'
// }
// Now the user types in the title input, triggering:

// ts
// Copy
// Edit
// setFormData(prevState => ({
//   ...prevState,
//   [name]: value
// }))
// If name = 'title' and value = 'New title', the result becomes:

// ts
// Copy
// Edit
// {
//   title: 'New title',       // updated
//   description: 'A test',     // preserved
//   visibility: 'public'       // preserved
// }
// ✅ Why use ...prevState?
// Because in React, state updates must be immutable — you can’t directly modify the old object, so you copy it using spread:

// ts
// Copy
// Edit
// {
//   ...prevState,      // copy existing values
//   [name]: value      // override the one that changed
// }
// 💡 Bonus: Dynamic key [name]
// You're using [name]: value instead of title: value to handle any input field dynamically — it works for description, visibility, etc.
