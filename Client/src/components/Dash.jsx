import React from 'react';
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="content">
          <h1 className="dashboard-heading">Meal Plans Categories</h1>
          <p className="dashboard-subheading">Choose a Category</p>
          <div className="dashboard-links">
            <div className="dashboard-link">
              <p className="link-heading">Dietary Preferences</p>
              <ul className="link-list">
                <li><a href="/meallist?category=vegan">Vegan</a></li>
                <li><a href="/meallist?category=vegetarian">Vegetarian</a></li>
                <li><a href="/meallist?category=paleo">Paleo</a></li>
                <li><a href="/meallist?category=keto">Keto</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
