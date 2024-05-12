import React from "react";
import { Button } from "@mui/material";

const RightSection = ({ toggleMealPlan, toggleWorkoutPlan, toggleWorkoutStatus }) => {
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-20 px-10">
          <Button
            sx={{
              width: "150%",
              borderRadius: "29px",
              py: "10px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
            onClick={toggleWorkoutStatus} // Call toggleWorkoutStatus function when button is clicked
          >
            My Workout Status
          </Button>
        </div>
        <div className="px-10">
          <Button
            sx={{
              width: "150%",
              borderRadius: "29px",
              py: "10px",
              bgcolor: "#1e88e5",
              marginTop: "-80px",
            }}
            variant="contained"
            onClick={toggleWorkoutPlan} // Call toggleWorkoutPlan function when button is clicked
          >
            Workout Plans
          </Button>
        </div>
        <div className="px-10">
          <Button
            sx={{
              width: "150%",
              borderRadius: "29px",
              py: "10px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
            onClick={toggleMealPlan} // Call toggleMealPlan function when button is clicked
          >
            Meal Plans
          </Button>
        </div>
        <div className="py-10"></div>
      </div>
    </div>
  );
};

export default RightSection;
