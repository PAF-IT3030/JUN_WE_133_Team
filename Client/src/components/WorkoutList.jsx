import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorkOut from '../services/WorkOut';

class ListWorkoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            loading: true,
            error: null
        };
        this.deleteWorkout = this.deleteWorkout.bind(this);
    }

    componentDidMount() {
        this.fetchWorkouts();
    }

    fetchWorkouts() {
        WorkOut.getWorkouts()
            .then((res) => {
                this.setState({ workouts: res.data, loading: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: "Error fetching data", loading: false });
            });
    }

    deleteWorkout(id) {
        WorkOut.deleteWorkout(id)
            .then(() => {
                const updatedWorkouts = this.state.workouts.filter(workout => workout.id !== id);
                this.setState({ workouts: updatedWorkouts });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { workouts, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
          <div style={{ padding: "20px" }}>
              <h2 style={{ textAlign: "center" }}>Workout List</h2>
              <div className="y">
                  <Link to="/save" className="btn btn-primary" style={{ backgroundColor: "green" }}>Add Workouts</Link>
              </div>
              <br />
              <div className="row">
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                      <thead>
                          <tr>
                              
                              <th style={{ border: "1px solid black", padding: "8px" }}>Workout Name</th>
                              <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
                              <th style={{ border: "1px solid black", padding: "8px" }}>Exercise Name</th>
                              <th style={{ border: "1px solid black", padding: "8px" }}>Sets</th>
                              <th style={{ border: "1px solid black", padding: "8px" }}>Repetition</th>
                              <th style={{ border: "1px solid black", padding: "8px" }}>Fitness</th>
                              <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {workouts.map(workout =>
                              <tr key={workout.id}>
                                  
                                  <td style={{ border: "1px solid black", padding: "8px" }}>{workout.workout_name}</td>
                                  <td style={{ border: "1px solid black", padding: "8px" }}>{workout.description}</td>
                                  <td style={{ border: "1px solid black", padding: "8px" }}>{workout.exercise_name}</td>
                                  <td style={{ border: "1px solid black", padding: "8px" }}>{workout.sets}</td>
                                  <td style={{ border: "1px solid black", padding: "8px" }}>{workout.repetition}</td>
                                  <td style={{ border: "1px solid black", padding: "8px" }}>{workout.fitness_goals}</td>
                                  <td style={{ border: "1px solid black", padding: "8px" }}>
                                      
                                      <button onClick={() => this.deleteWorkout(workout.id)} className="btn btn-danger" style={{ marginLeft: "10px", backgroundColor: "red" }}>Delete</button>
                                      <Link to={`/update/${workout.id}`} className="btn btn-info" style={{ marginLeft: "10px", backgroundColor: "orange" }}>Update</Link>
                                  </td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      );
      
    }
  }      

export default ListWorkoutComponent;
