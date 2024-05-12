import React, { useState, useEffect } from "react";
import { Avatar, Button, Select, MenuItem, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import axios from "axios"; // Import Axios
import { WorkoutCard } from "./WorkoutCard";

const WorkoutPlan = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exname, setExname] = useState("");
  const [userId, setUserId] = useState(1);
  const [titleError, setTitleError] = useState(false);
  const [sets, setSets] = useState(0);
  const [repetitions, setRepetitions] = useState(0);

  // const [uploadingImage, setUploadingImage] = useState(false);
  // const [dietary, setDietary] = useState(""); // New state for dietary field
  // const [recipe, setRecipe] = useState(""); // New state for recipe field
  // const [ingredients, setIngredients] = useState(""); // New state for ingredients field

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/workoutplan/workoutplans")
      .then((response) => response.json())
      .then((data) => setPlans(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === "") { 
        setTitleError(true);
        return;
    }

    // try {
        // const imageUrl = await uploadImage(); // Call the uploadImage function to get image URL
        // if (imageUrl) {
          const workoutData = {
            title: title,
            description: description,
            exname: exname, 
            userId: userId,
            sets: sets,
            repetitions: repetitions
          };
  
          const response = await fetch("http://localhost:8081/api/v1/workoutplan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(workoutData),
          });
  
          if (response.ok) {
            console.log("Workout submitted successfully!");
            setTitle("");
            setDescription("");
            setExname("");
            setSets();
            setRepetitions();
            setUserId(1);
          } else {
            console.error("Failed to submit workout plan:", response.statusText);
          }
    //     } else {
    //       console.error("Failed to upload image to Cloudinary");
    //     }
    // } catch (error) {
    //   console.error("Error submitting post:", error);
    // }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError(false); 
  };

  const handleCaptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleExnameChange = (event) => {
    setExname(event.target.value);
  };

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepetitionsChange = (event) => {
    setRepetitions(event.target.value);
  };

  // const handleSelectImage = (event) => {
  //   const selectedImage = event.target.files[0];
  //   setImage(selectedImage);
  // };

  // const uploadImage = async () => {
  //   if (image) {
  //     const formData = new FormData();
  //     formData.append("file", image);
  //     formData.append("upload_preset", "t25zpk5o"); // Replace with your actual upload preset from Cloudinary
  
  //     try {
  //       const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dpfeb0kt9/image/upload", // Replace with your Cloudinary cloud name
  //         formData
  //       );
  //       console.log("Cloudinary response:", response); // Log Cloudinary response for debugging
  //       return response.data.secure_url;
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       return null;
  //     }
  //   }
  //   return null;
  // };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Workout Plan</h1>
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
                  placeholder="Workout Plan (ex: winter workout...)"
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
                {titleError && <p style={{ color: "red" }}>Please fill the title</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="description"
                  placeholder="Your progress"
                  value={description}
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
              <div>
                <input
                  type="text"
                  name="exname"
                  placeholder="Main excersize name (ex: pushups, running,...)"
                  value={exname}
                  onChange={handleExnameChange}
                  style={{
                    border: "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                />
              </div>
              <div>
                <input 
                  type="number"
                  name="sets"
                  placeholder="Sets"
                  value={sets}
                  onChange={handleSetsChange}
                  style={{
                    border: "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                />
              </div>

              <div>
                <input
                  type="number"
                  name="repetitions"
                  placeholder="Repetitions"
                  value={repetitions}
                  onChange={handleRepetitionsChange}
                  style={{
                    border: "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                />
              </div>
              
              <br />
              
              <div className="flex justify-between items-center mt-5">
                {/* <div className="flex space-x-5 items-center">
                  {image && <img src={image} alt="Selected" />}
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div> */}
                <div>
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
                    Add Workout Plan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section>
        {plans.map((plan, index) => (
          <WorkoutCard key={index} plan={plan} />
        ))}
      </section>
    </div>
  );
};

export default WorkoutPlan;
