import React, { Component } from 'react';
import MediaService from '../services/MediaService';
import { Link } from 'react-router-dom';

class CreateMediaComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fitness_act: '',
            workouts: '',
            meals: '',
            progress: '',
            imagefileName:'',
            errors: {} // Initialize errors object
        };

        this.changefitness_actHandler = this.changefitness_actHandler.bind(this);
        this.changeworkoutsHandler = this.changeworkoutsHandler.bind(this);
        this.changemealsHandler = this.changemealsHandler.bind(this);
        this.changeprogressHandler = this.changeprogressHandler.bind(this);
        this.changeimagefileNameHandler = this.changeimagefileNameHandler.bind(this);
        this.saveOrUpdatePosts = this.saveOrUpdatePosts.bind(this);
    }

    // Validation function
    validateForm() {
        let errors = {};
        let formIsValid = true;

        // Validate fitness_act
        if (!this.state.fitness_act) {
            formIsValid = false;
            errors["fitness_act"] = "Fitness Activity is required.";
        }

        // Validate workouts
        if (!this.state.workouts) {
            formIsValid = false;
            errors["workouts"] = "Workouts are required.";
        }

        // Validate meals
        if (!this.state.meals) {
            formIsValid = false;
            errors["meals"] = "Meals are required.";
        }

        // Validate progress
        if (!this.state.progress) {
            formIsValid = false;
            errors["progress"] = "Progress is required.";
        }

        // Set errors state
        this.setState({ errors: errors });

        return formIsValid;
    }

    saveOrUpdatePosts = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }

        let userMedia = {
            fitness_act: this.state.fitness_act,
            workouts: this.state.workouts,
            meals: this.state.meals,
            progress: this.state.progress,
            imagefileName: this.state.imagefileName
        };

        MediaService.createMedia(userMedia)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    }
    
    changefitness_actHandler = (event) => {
        this.setState({ fitness_act: event.target.value });
    }

    changeworkoutsHandler = (event) => {
        this.setState({ workouts: event.target.value });
    }

    changemealsHandler = (event) => {
        this.setState({ meals: event.target.value });
    }

    changeprogressHandler = (event) => {
        this.setState({ progress: event.target.value });
    }
    changeimagefileNameHandler = (event) => {
        this.setState({ imagefileName: event.target.value });
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add post</h3>
                            <div className="card-body">
                                <form encType='multipart/form-data'>
                                    <div className="form-group">
                                        <label> Fitness Activity: </label>
                                        <input placeholder="Fitness Activity" name="fitnessActivity" className="form-control" 
                                            value={this.state.fitness_act} onChange={this.changefitness_actHandler} required/>
                                        <div className="text-danger">{this.state.errors.fitness_act}</div>
                                    </div>
                                    <div className="form-group">
                                        <label> Workouts: </label>
                                        <input placeholder="Workouts" name="workouts" className="form-control" 
                                            value={this.state.workouts} onChange={this.changeworkoutsHandler} required/>
                                        <div className="text-danger">{this.state.errors.workouts}</div>
                                    </div>
                                    <div className="form-group">
                                        <label> Meals: </label>
                                        <input placeholder="Meals" name="meals" className="form-control" 
                                            value={this.state.meals} onChange={this.changemealsHandler} required/>
                                        <div className="text-danger">{this.state.errors.meals}</div>
                                    </div>
                                    <div className="form-group">
                                        <label> Progress: </label>
                                        <input placeholder="Progress" name="progress" className="form-control" 
                                            value={this.state.progress} onChange={this.changeprogressHandler} required/>
                                        <div className="text-danger">{this.state.errors.progress}</div>
                                    </div>

                                    <div className="form-group">
                                        <label> Image: </label>
                                        <input type='file' placeholder="imagefileName" name="imagefileName" className="form-control" 
                                            value={this.state.imagefileName} onChange={this.changeimagefileNameHandler}/>
                                    </div>

                                    <button className="btn btn-primary" onClick={this.saveOrUpdatePosts}>Save</button>
                                    <Link to="/" className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateMediaComponent;
