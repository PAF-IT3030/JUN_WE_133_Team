import React, { useState } from "react";
import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightSection from "../RightSection/RigthSection";
import MealPlan from "../RightSection/MealPlan/MealPlan";


const HomePage = () => {
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [showWorkoutStatus, setShowWorkoutStatus] = useState(false);

  const toggleMealPlan = () => {
    setShowMealPlan(!showMealPlan); // Toggle the state to show/hide Meal Plan
    setShowWorkoutPlan(false); // Ensure only one section is open at a time
    setShowWorkoutStatus(false);
  };

  const toggleWorkoutPlan = () => {
    setShowWorkoutPlan(!showWorkoutPlan); // Toggle the state to show/hide workout plan
    setShowMealPlan(false); // Ensure only one section is open at a time
    setShowWorkoutStatus(false);
  };

  const toggleWorkoutStatus = () => {
    setShowWorkoutStatus(!showWorkoutStatus); // Toggle the state to show/hide workout status
    setShowMealPlan(false); // Ensure only one section is open at a time
    setShowWorkoutPlan(false);
  };

  return (
    <Grid container className="px-5 lg:px-36 justify-between">
      <Grid item xs={12} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid item xs={12} lg={6} className="hidden lg:block w-full relative">
        {/* Conditional rendering based on showMealPlan, showWorkoutPlan, and showWorkoutStatus states */}
        {showMealPlan && <MealPlan />}
        {showWorkoutPlan && <WorkoutPlan />}
        {showWorkoutStatus && <WorkoutStatus />}
        {!showMealPlan && !showWorkoutPlan && !showWorkoutStatus && <HomeSection />}
      </Grid>
      <Grid item xs={12} lg={3} className="hidden lg:block w-full relative">
        <RightSection
          toggleMealPlan={toggleMealPlan}
          toggleWorkoutPlan={toggleWorkoutPlan}
          toggleWorkoutStatus={toggleWorkoutStatus}
        /> {/* Pass toggle functions as props */}
      </Grid>
    </Grid>
  );
};

export default HomePage;
