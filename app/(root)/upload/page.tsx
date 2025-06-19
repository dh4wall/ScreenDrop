"use client";
import FileInput from "@/component/FileInput";
import FormField from "@/component/FormField";
import React, { ChangeEvent, useState } from "react";

const page = () => {
  const [error, seterror] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}

      <form
        className="rounded-20 shadow-20 gap-6 w-full flex flex-col px-5 py-7.5"
        action=""
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
        <FileInput />
        <FileInput />
        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          options={[
            {value:"public",label:"Public"},
            {value:"private",label:"Private"}
        ]}
          as="select"
        />
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
