import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebaseConfig";
import "./style.scss";
import { Primary__Btn, Primary__Input } from "../../components";
const Index = () => {
  const [data, setData] = useState({});
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };
  const changeHandle = (e) => {
    const { value, id } = e.target;

    setData({ ...data, [id]: value });
  };

  const handleClick = async () => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, image);
      console.log("Uploaded a blob or file!");

      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(collection(db, "images"), {
        ...data,
        url: downloadURL,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="create__main">
      <div className="create__flex__section">
        <div>
          <h1>Image Post</h1>
        </div>
        <div>
          <Primary__Input
            onchange={changeHandle}
            type="text"
            id="title"
            placeholder={"Enter  Title"}
          />
        </div>
        <div>
          <Primary__Input
            onchange={changeHandle}
            type="text"
            id="description"
            placeholder={"Enter  description..."}
          />
        </div>
        <div className="label__main">
          <label className="label__upload__image" htmlFor="url">
            Upload The image
          </label>
          <Primary__Input
            onchange={handleChange}
            type={"file"}
            accept="image/*"
            id={"url"}
            classes={"upload__inp"}
          />
        </div>
        <div>
          <Primary__Btn onClick={handleClick}>Submit</Primary__Btn>
        </div>
      </div>
    </div>
  );
};

export default Index;
