import React, { Component } from 'react';
import WorkOut from '../services/WorkOut';
import { Link } from 'react-router-dom';

class CreateWorkoutComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workout_name: '',
            description: '',
            exercise_name: '',
            sets: '',
            repetition: '',
            fitness_goals: '',
            successMessage: ''
        };

        this.changeWorkoutNameHandler = this.changeWorkoutNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeExerciseNameHandler = this.changeExerciseNameHandler.bind(this);
        this.changeSetsHandler = this.changeSetsHandler.bind(this);
        this.changeRepetitionHandler = this.changeRepetitionHandler.bind(this);
        this.changeFitnessGoalsHandler = this.changeFitnessGoalsHandler.bind(this);
        this.saveOrUpdateWorkout = this.saveOrUpdateWorkout.bind(this);
    }

    saveOrUpdateWorkout = (e) => {
        e.preventDefault();
        let workout = {
            workout_name: this.state.workout_name,
            description: this.state.description,
            exercise_name: this.state.exercise_name,
            sets: this.state.sets,
            repetition: this.state.repetition,
            fitness_goals: this.state.fitness_goals
        };

        // Add validation logic here 
        if (!workout.workout_name || !workout.description || !workout.exercise_name || !workout.sets || !workout.repetition || !workout.fitness_goals) {
            alert("Please fill in all fields.");
            return;
        }

        WorkOut.createWorkout(workout)
            .then(res => {
                this.setState({ successMessage: 'Workout created successfully!' });
                setTimeout(() => {
                    this.setState({ successMessage: '' });
                    this.props.history.push('/');
                }, 2000);
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    }
    
    changeWorkoutNameHandler = (event) => {
        this.setState({ workout_name: event.target.value });
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    changeExerciseNameHandler = (event) => {
        this.setState({ exercise_name: event.target.value });
    }

    changeSetsHandler = (event) => {
        this.setState({ sets: event.target.value });
    }

    changeRepetitionHandler = (event) => {
        this.setState({ repetition: event.target.value });
    }

    changeFitnessGoalsHandler = (event) => {
        this.setState({ fitness_goals: event.target.value });
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">Dashboard</div>
                        <div className="card-body">
                            <ul className="nav flex-column">
                                <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                                <li className="nav-item"><a href="/add-workout" className="nav-link">Profile</a></li>
                                <li className="nav-item"><a href="/update-workout" className="nav-link">Posts</a></li>
                                <li className="nav-item"><a href="/update-workout" className="nav-link">Settings</a></li>
                                <li className="nav-item"><a href="/update-workout" className="nav-link">Notifications</a></li>
                                {/* More links can be added here */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="container">
                        <div className="row">
                            <div className="card col-md-8 offset-md-2">
                                <h3 className="text-center">Add Workouts</h3>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label> Workout Name: </label>
                                            <input placeholder="Enter Workout Name" required name="workoutName" className="form-control" 
                                                value={this.state.workout_name} onChange={this.changeWorkoutNameHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label> Description: </label>
                                            <input placeholder="Enter Description" required name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label> Exercise Name: </label>
                                            <input placeholder="Enter Exercise Name" required name="exerciseName" className="form-control" 
                                                value={this.state.exercise_name} onChange={this.changeExerciseNameHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label> Sets: </label>
                                            <input placeholder="Enter Sets" required name="sets" className="form-control" 
                                                value={this.state.sets} onChange={this.changeSetsHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label> Repetition: </label>
                                            <input placeholder="Enter Repetition" name="repetition" className="form-control" 
                                                value={this.state.repetition} onChange={this.changeRepetitionHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label> Fitness Goals: </label>
                                            <input placeholder="Enter Fitness Goals" name="fitnessGoals" className="form-control" 
                                                value={this.state.fitness_goals} onChange={this.changeFitnessGoalsHandler}/>
                                        </div>

                                        {/* Success message */}
                                        {this.state.successMessage && (
                                            <div className="alert alert-success" role="alert">
                                                {this.state.successMessage}
                                            </div>
                                        )}
                                        <br></br>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateWorkout}>Save</button>
                                        <Link to="/" className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        )
    }
}

export default CreateWorkoutComponent;
