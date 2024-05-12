import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./meal.css";

export const MealCard = ({ meal, onEdit }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isPostVisible, setIsPostVisible] = useState(true); // State to manage post visibility

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      // Send a DELETE request to your backend
      const response = await fetch(
        `http://localhost:8081/api/v1/meal/${meal.id}`,
        {
          method: "DELETE",
        }
      );

      // Check if the request was successful
      if (response.ok) {
        console.log("Post deleted successfully!");
        setIsPostVisible(false); // Hide the post from view
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }

    handleClose();
  };

  const handleOpenReplyModel = () => {
    console.log("open model");
  };

  const handleCreateRePost = () => {
    console.log("handle create re post");
  };

  const handleLikePost = () => {
    console.log("handle like post");
  };

  const handleEdit = () => {
    onEdit(meal);
    handleClose(); // Close the menu after clicking Edit
  };

  if (!isPostVisible) {
    return null;
  }

  return (
    <div>
      <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          alt="username"
          src=""
          onClick={() => navigate(`/profiles/${6}`)}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Kushan</span> &nbsp; &nbsp; &nbsp; &nbsp;
              <span className="text-gray-600">@kushan  . 2m</span>
            </div>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
              >
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
          <div className="cursor-pointer">
                <p className="mb-2 p-0 meal_title">
                  {meal.mealTittle} &nbsp;&nbsp;&nbsp; ( {meal.dietary} )
                </p>{" "}
                <br />
                <div className="cursor-pointer meal_box">
                  <img
                    className="w-[28rem] border border-grey-400 p-5 rounded-md meal_image"
                    src={meal.mealImage}
                    alt={meal.mealTittle}
                  />
                  <div className="meal_content">
                    <p><b className="meal_topic">Ingredients : </b>{meal.ingredients}</p>
                    <p><b className="meal_topic">Recipe : </b>{meal.recipe}</p>
                  </div>
                </div>
              </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>43</p>
              </div>

              <div
                className={`${
                  true ? "text-pink-600" : "text-grey-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRePost}
                />
                <p>54</p>
              </div>

              <div
                className={`${
                  true ? "text-pink-600" : "text-grey-600"
                } space-x-3 flex items-center`}
              >
                {true ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleLikePost}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handleLikePost}
                  />
                )}
                <p>54</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>430</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
