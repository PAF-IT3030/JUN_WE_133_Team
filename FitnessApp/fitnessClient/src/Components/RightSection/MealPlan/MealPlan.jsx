import React, { useState, useEffect } from "react";
import { Avatar, Button, Select, MenuItem, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { MealCard } from "./MealCard";
import axios from "axios"; // Import Axios

const MealPlan = () => {
  const [userId, setUserId] = useState(1);
  const [mealTittle, setMealTittle] = useState("");
  const [caption, setCaption] = useState("");
  const [mealImage, setMealImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [dietary, setDietary] = useState(""); // New state for dietary field
  const [recipe, setRecipe] = useState(""); // New state for recipe field
  const [ingredients, setIngredients] = useState(""); // New state for ingredients field
  const [editedMeal, setEditedMeal] = useState(null); // State to track edited meal

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/meal/meals")
      .then((response) => response.json())
      .then((data) => setMeals(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mealTittle === "") {
      setTitleError(true);
      return;
    }

    try {
      const imageUrl = await uploadImage(); // Call the uploadImage function to get image URL
      if (imageUrl) {
        const postData = {
          userId: userId,
          mealTittle: mealTittle,
          mealImage: imageUrl, // Use the Cloudinary image URL
          dietary: dietary, // Add dietary field to post data
          recipe: recipe, // Add recipe field to post data
          ingredients: ingredients, // Add ingredients field to post data
        };

        const response = await fetch("http://localhost:8081/api/v1/meal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          console.log("Post submitted successfully!");
          setMealTittle("");
          setCaption("");
          setMealImage("");
          setTitleError(false);
          fetchMeals();
        } else {
          console.error("Failed to submit post:", response.statusText);
        }
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleTitleChange = (event) => {
    setMealTittle(event.target.value);
    setTitleError(false);
  };

  const handleCaptionChange = (event) => {
    setRecipe(event.target.value);
  };

  const handleSelectImage = (event) => {
    const selectedImage = event.target.files[0];
    setMealImage(selectedImage);
  };

  const uploadImage = async () => {
    if (mealImage) {
      const formData = new FormData();
      formData.append("file", mealImage);
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
    }
    return null;
  };

  const handleEditMeal = (meal) => {
    setEditedMeal(meal);
    setMealTittle(meal.mealTittle);
    setRecipe(meal.recipe);
    setDietary(meal.dietary);
    setIngredients(meal.ingredients);
  };

  const handleUpdateMeal = async () => {
    try {
      let imageUrl = editedMeal.mealImage;
      if (mealImage) {
        imageUrl = await uploadImage(); // Update image only if a new image is selected
        if (!imageUrl) {
          console.error("Failed to upload new image to Cloudinary");
          return;
        }
      }

      const postData = {
        userId: editedMeal.userId,
        mealTittle: mealTittle,
        mealImage: imageUrl,
        dietary: dietary,
        recipe: recipe,
        ingredients: ingredients,
      };

      const response = await fetch(
        `http://localhost:8081/api/v1/meal/${editedMeal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        console.log("Meal updated successfully!");
        setEditedMeal(null);
        setMealTittle("");
        setCaption("");
        setMealImage("");
        fetchMeals(); // Fetch meals again after updating a meal
      } else {
        console.error("Failed to update meal:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/meal/meals");
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      } else {
        console.error("Failed to fetch meals:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Meal Plans</h1>
      </section>
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" src="" />
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="mealTittle"
                  placeholder="Meal Name"
                  value={mealTittle}
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
                  <p style={{ color: "red" }}>Please fill the meal name</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="recipe"
                  placeholder="Your Recipe"
                  value={recipe}
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
                <Select
                  value={dietary}
                  onChange={(event) => setDietary(event.target.value)}
                  placeholder="Select Dietary"
                  style={{
                    border: "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  <MenuItem value="vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="nonvegetarian">Non-Vegetarian</MenuItem>
                  <MenuItem value="keto">Keto</MenuItem>
                </Select>
              </div>
              <div>
                <input
                  type="text"
                  name="ingredients"
                  placeholder="Ingredients"
                  value={ingredients}
                  onChange={(event) => setIngredients(event.target.value)}
                  style={{
                    border: "2px solid #1e88e5",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    width: "100%",
                    marginTop: "10px",
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  {mealImage && <img src={mealImage} alt="Selected" />}
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
                </div>
                <div>
                  {/* Conditional rendering for buttons */}
                  {editedMeal ? (
                    <div>
                      <Button onClick={() => setEditedMeal(null)}>
                        Cancel Edit
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
                        onClick={handleUpdateMeal}
                      >
                        Update Meal
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
                      Add Meal Plan
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section>
        {meals.map((meal, index) => (
          <div key={index}>
            {editedMeal && editedMeal.id === meal.id ? (
              null
            ) : (
              <MealCard key={index} meal={meal} onEdit={handleEditMeal} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default MealPlan;
