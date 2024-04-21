import React, { useState, useEffect } from 'react';
import WorkOut from "../services/WorkOut";

const UpdateUser = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState(''); 
  const [repetitions, setRepetitions] = useState(''); 
  const [fitnessGoals, setFitnessGoals] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await WorkOut.getWorkouts();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'workout_name':
        setWorkoutName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'exercise_name':
        setExerciseName(value);
        break;
      case 'sets':
        setSets(value); // Allow both numbers and numeric strings
        break;
      case 'repetitions':
        setRepetitions(value); // Allow both numbers and numeric strings
        break;
      case 'fitness_goals':
        setFitnessGoals(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = users.length > 0 ? users[0].id : ''; 
      await WorkOut.updateWorkout({
        workout_name: workoutName,
        description: description,
        exercise_name: exerciseName,
        sets: parseInt(sets), 
        repetitions: parseInt(repetitions), 
        fitness_goals: fitnessGoals
      }, id);
      alert('Workout updated successfully');
      fetchUsers();
      // Clear input fields after submission
      setWorkoutName('');
      setDescription('');
      setExerciseName('');
      setSets('');
      setRepetitions('');
      setFitnessGoals('');
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
            <h3 className="text-center">Update Workout</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Workout Name:</label>
                  <input
                    type="text"
                    value={workoutName}
                    onChange={handleInputChange}
                    name="workout_name"
                    placeholder="Workout Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    value={description}
                    onChange={handleInputChange}
                    name="description"
                    placeholder="Description"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Exercise Name:</label>
                  <input
                    type="text"
                    value={exerciseName}
                    onChange={handleInputChange}
                    name="exercise_name"
                    placeholder="Exercise Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Sets:</label>
                  <input
                    type="text"
                    value={sets}
                    onChange={handleInputChange}
                    name="sets"
                    placeholder="Sets"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Repetitions:</label>
                  <input
                    type="text"
                    value={repetitions}
                    onChange={handleInputChange}
                    name="repetitions"
                    placeholder="Repetitions"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Fitness Goals:</label>
                  <textarea
                    value={fitnessGoals}
                    onChange={handleInputChange}
                    name="fitness_goals"
                    placeholder="Fitness Goals"
                    className="form-control"
                  />
                </div>
                <br></br>
                <button type="submit" className="btn btn-success">Update Workout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
