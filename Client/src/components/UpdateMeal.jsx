import React, { useState, useEffect } from 'react';
import MealPlan from "../services/MealPlan";

const UpdateMeal = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');

  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await MealPlan.getMeals();
      setMeals(response.data);
     
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstname':
        setFirstname(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'occupation':
        setOccupation(value);
        break;
      case 'age':
        setAge(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const id = meals.length > 0 ? meals[0].id : '';
      await MealPlan.updateMeal({ firstname, lastname, occupation, age }, id);
      alert('Meal updated successfully');
      fetchMeals();
      // Clear form fields
      setFirstname('');
      setLastname('');
      setOccupation('');
      setAge('');
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Update Meal</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Meal Plans</label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={handleInputChange}
                    name="firstname"
                    placeholder="Enter New meal plan"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Recipes</label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={handleInputChange}
                    name="lastname"
                    placeholder="Enter New Recipes"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nutritional Information</label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={handleInputChange}
                    name="occupation"
                    placeholder="Enter New Nutritional Information"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Potion Size</label>
                  <input
                    type="number"
                    value={age}
                    onChange={handleInputChange}
                    name="age"
                    placeholder="Enter New Potion Size"
                    className="form-control"
                  />
                </div><br></br>
                <button type="submit" className="btn btn-success">Update Meal</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMeal;
