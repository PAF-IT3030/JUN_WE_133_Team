import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { PostCard } from "./PostCard";
import axios from "axios"; // Import Axios
import "./post.css";

const HomeSection = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [editedPost, setEditedPost] = useState(null); // State to track edited post
  const [err, setErr] = useState(""); // State to manage error message
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === "") {
      setTitleError(true);
      return;
    }

    try {
      const imageUrls = await Promise.all(images.map(uploadImage));
      
      const postData = {
        title: title,
        caption: caption,
        imageUrls: imageUrls,
      };

      const response = await fetch("http://localhost:8081/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Post submitted successfully!");
        setTitle("");
        setCaption("");
        setImages([]);
        setTitleError(false);
        fetchPosts(); // Fetch posts again after submitting a new post
      } else {
        console.error("Failed to submit post:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSelectImage = (event) => {
    const selectedImages = Array.from(event.target.files);
    
    // Check if the total number of images exceeds 3
    if (selectedImages.length > 3) {
      setErr("** You can only upload up to 3 images.");
      return;
    }
    console.log("length", selectedImages.length);

    setImages(selectedImages);
  };
  
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "t25zpk5o"); // Replace with your actual upload preset from Cloudinary

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpfeb0kt9/image/upload", // Replace with your Cloudinary cloud name
        formData
      );
      console.log("Cloudinary response:", response); // Log Cloudinary response for debugging
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleEditPost = (post) => {
    setEditedPost(post);
    setTitle(post.title);
    setCaption(post.caption);
  };

  const handleUpdatePost = async () => {
    try {
      const imageUrls = await Promise.all(images.map(uploadImage));

      const postData = {
        title: title,
        caption: caption,
        imageUrls: imageUrls,
      };

      const response = await fetch(
        `http://localhost:8081/api/v1/post/${editedPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        console.log("Post updated successfully!");
        setEditedPost(null);
        setTitle("");
        setCaption("");
        setImages([]);
        fetchPosts(); // Fetch posts again after updating a post
      } else {
        console.error("Failed to update post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/post");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" src="" />
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Post Title"
                  value={title}
                  onChange={handleTitleChange}
                  style={{
                    border: titleError ? "2px solid red" : "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                {titleError && (
                  <p style={{ color: "red", fontSize: "10px"}}>Please fill the title</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="caption"
                  placeholder="Your fitness ideas"
                  value={caption}
                  onChange={handleCaptionChange}
                  style={{
                    border: "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                />
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index + 1}`}
                      style={{ maxHeight: "100px" }}
                    />
                  ))}

                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                      multiple
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div>

                <div>
                  {editedPost ? (
                    <div>
                      <Button onClick={() => setEditedPost(null)}>
                        Cancel
                      </Button>
                      <Button
                        sx={{
                          width: "50%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        onClick={handleUpdatePost}
                      >
                        Update
                      </Button>
                    </div>
                  ) : (
                    <Button
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        paddingY: "8px",
                        paddingX: "20px",
                        bgcolor: "#1e88e5",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      Post
                    </Button>
                  )}
                </div>
              </div>
              <p style={{ color: "red" }}>{err}</p>
            </form>
          </div>
        </div>
      </section>

      <section>
        {posts.map((post, index) => (
          <div key={index}>
            {editedPost && editedPost.id === post.id ? (
              null
            ) : (
              <PostCard key={index} post={post} onEdit={handleEditPost} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
