import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { navigate } from "react-router-dom"; // Import navigate from react-router-dom
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WorkoutPlan from "./WorkoutPlan";
import "./plan.css";

export const WorkoutCard = ({ plan }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isPostVisible, setIsPostVisible] = useState(true); // State to manage post visibility
  const [isEditMode, setIsEditMode] = useState(false); // State to manage edit mode
  const [editedPlan, setEditedPlan] = useState({ ...plan }); // State to manage edited plan

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
        `http://localhost:8081/api/v1/workoutplan/${plan.id}`,
        {
          method: "DELETE",
        }
      );

      // Check if the request was successful
      if (response.ok) {
        console.log("Workout plan deleted successfully!");
        setIsPostVisible(false); // Hide the post from view
      } else {
        console.error("Failed to delete workout status:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }

    handleClose();
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedPlan(plan); // Reset edited plan to original plan
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/workoutplan/${editedPlan.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPlan),
        }
      );

      if (response.ok) {
        console.log("Workout plan updated successfully!");
        setIsEditMode(false);
        navigate("/workoutplan");
      } else {
        console.error("Failed to update workout plan:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating workout plan:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
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
          <div className="mt-2">
            <div className="plan_box">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  {isEditMode ? (
                    <input
                      type="text"
                      name="title"
                      value={editedPlan.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="title_box">
                      <p className="plan_title">{plan.title}</p>
                    </div>
                  )}
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
              </div> <hr /><br />
              {isEditMode ? (
                <textarea
                  name="description"
                  value={editedPlan.description}
                  onChange={handleInputChange}
                />
              ) : (
                <p variant="subtitle2">
                  <b className="plan_bold">Description : </b>&nbsp;
                  {plan.description}
                </p>
              )}
              <p className="mb-5 p-0">
                <b className="plan_bold">Exercise : </b>&nbsp;
                {isEditMode ? (
                  <input
                    type="text"
                    name="exname"
                    value={editedPlan.exname}
                    onChange={handleInputChange}
                  />
                ) : (
                  plan.exname
                )}
              </p>
              <p className="mb-2 p-0">
                <b className="plan_bold">Sets : </b>&nbsp;
                {isEditMode ? (
                  <input
                    type="text"
                    name="sets"
                    value={editedPlan.sets}
                    onChange={handleInputChange}
                  />
                ) : (
                  plan.sets
                )}
              </p>
              <p className="mb-2 p-0">
                <b className="plan_bold">Repetitions : </b>&nbsp;
                {isEditMode ? (
                  <input
                    type="text"
                    name="repetitions"
                    value={editedPlan.repetitions}
                    onChange={handleInputChange}
                  />
                ) : (
                  plan.repetitions
                )}
              </p>
              {/* Additional fields */}
            </div>

            {/* Other content */}

            <div className="py-5 flex flex-wrap justify-between items-center">
              {/* Other actions */}
            </div>
          </div>
          {isEditMode && (
            <div>
              <Button onClick={handleSaveEdit}>Save</Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
