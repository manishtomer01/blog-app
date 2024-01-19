"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);
  const [files, setFiles] = useState(undefined);
  const [fileUrl, setFileUrl] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (files) {
      handleFileUpload(files);
    }
  }, [files]);

  const handleFileUpload = (files) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + files.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload progress: ", progress);
      },
      (error) => {
        console.error("File upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input
        type="file"
        onChange={(e) => {
          setFiles(e.target.files[0]);
        }}
        accept="image/*"
        ref={fileRef}
        hidden
        name="img"
      />
      <button onClick={() => fileRef.current.click()}>Upload Photo</button>
      <input type="hidden" name="img" value={fileUrl} />
      <textarea type="text" name="desc" placeholder="desc" rows={10} />
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
