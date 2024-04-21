import React, { useState, useEffect } from 'react';
import MediaService from "../services/MediaService";

const UpdateMedia = () => {
  const [fitness_act, setFitness_act] = useState('');
  const [workouts, setWorkouts] = useState('');
  const [meals, setMeals] = useState('');
  const [progress, setProgress] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await MediaService.getMedia();
      setUsers(response.data);
      // If you want to automatically select the first user, uncomment the next line
      // setSelectedUserId(response.data.length > 0 ? response.data[0].id : '');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fitness_act':
        setFitness_act(value);
        break;
      case 'workouts':
        setWorkouts(value);
        break;
      case 'meals':
        setMeals(value);
        break;
      case 'progress':
        setProgress(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming the first user in the list is being updated
      const id = users.length > 0 ? users[0].id : '';
      await MediaService.updateMedia({ fitness_act, workouts, meals, progress }, id);
      alert('User updated successfully');
      fetchUsers();
      // Clear form fields
      setFitness_act('');
      setWorkouts('');
      setMeals('');
      setProgress('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Update User</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Fitness Activity:</label>
                  <input
                    type="text"
                    value={fitness_act}
                    onChange={handleInputChange}
                    name="fitness_act"
                    placeholder="Fitness_act"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Workouts:</label>
                  <input
                    type="text"
                    value={workouts}
                    onChange={handleInputChange}
                    name="workouts"
                    placeholder="Workouts"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Meal:</label>
                  <input
                    type="text"
                    value={meals}
                    onChange={handleInputChange}
                    name="meals"
                    placeholder="Meals"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>progress:</label>
                  <input
                    type="number"
                    value={progress}
                    onChange={handleInputChange}
                    name="progress"
                    placeholder="Progress"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-success">Update User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMedia;
