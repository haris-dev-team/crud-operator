import React, { useEffect, useState } from "react";
import "./style.scss";
import { Divider } from "@mui/material";
import { Card } from "../../components";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const Index = () => {
  // Separate states for images and videos
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // Separate edit states for images and videos
  const [editImageId, setEditImageId] = useState(null);
  const [editVideoId, setEditVideoId] = useState(null);

  const [editData, setEditData] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "images"));
      const imagesArray = [];
      querySnapshot.forEach((doc) => {
        imagesArray.push({ id: doc.id, ...doc.data() });
      });
      setImages(imagesArray);
    };

    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "video"));
      const videosArray = [];
      querySnapshot.forEach((doc) => {
        videosArray.push({ id: doc.id, ...doc.data() });
      });
      setVideos(videosArray);
    };

    fetchImages();
    fetchVideos();
  }, []);

  // Image handlers
  const handleDeleteImage = async (id) => {
    try {
      await deleteDoc(doc(db, "images", id));
      setImages(images.filter((image) => image.id !== id));
    } catch (e) {
      console.error("Error deleting image: ", e);
    }
  };

  const handleSaveImage = async (id) => {
    try {
      const imageRef = doc(db, "images", id);
      await updateDoc(imageRef, {
        title: editData.title,
        description: editData.description,
      });
      setImages(
        images.map((image) =>
          image.id === id
            ? {
                ...image,
                title: editData.title,
                description: editData.description,
              }
            : image
        )
      );
      setEditImageId(null);
    } catch (e) {
      console.error("Error updating image: ", e);
    }
  };

  const handleEditClickImage = (image) => {
    setEditImageId(image.id);
    setEditData({ title: image.title, description: image.description });
  };

  // Video handlers
  const handleDeleteVideo = async (id) => {
    try {
      await deleteDoc(doc(db, "video", id));
      setVideos(videos.filter((video) => video.id !== id));
    } catch (e) {
      console.error("Error deleting video: ", e);
    }
  };

  const handleSaveVideo = async (id) => {
    try {
      const videoRef = doc(db, "video", id);
      await updateDoc(videoRef, {
        title: editData.title,
        description: editData.description,
      });
      setVideos(
        videos.map((video) =>
          video.id === id
            ? {
                ...video,
                title: editData.title,
                description: editData.description,
              }
            : video
        )
      );
      setEditVideoId(null);
    } catch (e) {
      console.error("Error updating video: ", e);
    }
  };

  const handleEditClickVideo = (video) => {
    setEditVideoId(video.id);
    setEditData({ title: video.title, description: video.description });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div className="home__main">
      {/* Images Section */}
      <div className="images__Post">
        <h1>Images</h1>
        <Divider sx={{ marginY: "20px" }} />
        <div className="card__div">
          {images.map((image) => (
            <div key={image.id}>
              {editImageId === image.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Enter new title"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    placeholder="Enter new description"
                  />
                  <button onClick={() => handleSaveImage(image.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditImageId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <Card
                    title={image.title || "No Title"}
                    description={image.description || "No Description"}
                    url={image.url || ""}
                  />
                  <div className="buttons__div">
                    <button onClick={() => handleEditClickImage(image)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteImage(image.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="images__Post">
        <h1>Videos</h1>
        <Divider sx={{ marginY: "20px" }} />
        <div className="card__div">
          {videos.map((video) => (
            <div key={video.id}>
              {editVideoId === video.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Enter new title"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    placeholder="Enter new description"
                  />
                  <button onClick={() => handleSaveVideo(video.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditVideoId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <Card
                    title={video.title || "No Title"}
                    description={video.description || "No Description"}
                    source={video.url || ""}
                  />
                  <div className="buttons__div">
                    <button onClick={() => handleEditClickVideo(video)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteVideo(video.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
