import React, { useState, useEffect } from 'react';
import MealPlan from "../services/MealPlan";

const UpdateMeal = () => {
  const [meals, setMeals] = useState('');
  const [recipes, setRecipes] = useState('');
  const [info, setInfo] = useState('');
  const [potion, setPotion] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await MealPlan.getMeals();
      setUsers(response.data);
     
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'meals':
        setMeals(value);
        break;
      case 'recipes':
        setRecipes(value);
        break;
      case 'info':
        setInfo(value);
        break;
      case 'potion':
        setPotion(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const id = users.length > 0 ? users[0].id : '';
      await MealPlan.updateMeal({ meals, recipes, info, potion }, id);
      alert('Meal updated successfully');
      fetchUsers();
      // Clear form fields
      setMeals('');
      setRecipes('');
      setInfo('');
      setPotion('');
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
                    value={meals}
                    onChange={handleInputChange}
                    name="meals"
                    placeholder="Enter New meal plan"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Recipes</label>
                  <input
                    type="text"
                    value={recipes}
                    onChange={handleInputChange}
                    name="recipes"
                    placeholder="Enter New Recipes"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nutritional Information</label>
                  <input
                    type="text"
                    value={info}
                    onChange={handleInputChange}
                    name="info"
                    placeholder="Enter New Nutritional Information"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Potion Size</label>
                  <input
                    type="number"
                    value={potion}
                    onChange={handleInputChange}
                    name="potion"
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
