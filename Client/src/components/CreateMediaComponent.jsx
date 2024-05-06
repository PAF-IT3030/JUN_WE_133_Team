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
            errors: {}, 
            successMessage: ''
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
                // Set success message
                this.setState({ successMessage: 'Post added successfully!' });
                // Redirect to the homepage after 2 seconds
                setTimeout(() => {
                    this.props.history.push('/');
                }, 2000);
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
        const { errors, successMessage } = this.state;

        return (
            <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f0f0f0',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{ 
                    background: '#fff',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    width: '100%' 
                }}>
                    <h3 style={{ 
                        textAlign: 'center', 
                        marginBottom: '20px', 
                        color: '#333',
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        Add Post
                    </h3>
                    <div>
                        {successMessage && (
                            <div style={{ 
                                marginBottom: '20px',
                                textAlign: 'center',
                                color: '#155724',
                                backgroundColor: '#d4edda',
                                borderColor: '#c3e6cb',
                                padding: '.75rem 1.25rem',
                                borderRadius: '.25rem'
                            }}>
                                {successMessage}
                            </div>
                        )}
                        <form encType='multipart/form-data'>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: '#555', marginBottom: '5px', display: 'block' }}>Fitness Activity: </label>
                                <input 
                                    placeholder="Fitness Activity" 
                                    name="fitnessActivity" 
                                    className={`form-control ${errors.fitness_act && 'is-invalid'}`} 
                                    value={this.state.fitness_act} 
                                    onChange={this.changefitness_actHandler} 
                                    required
                                />
                                {errors.fitness_act && <div className="invalid-feedback">{errors.fitness_act}</div>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: '#555', marginBottom: '5px', display: 'block' }}>Workouts: </label>
                                <input 
                                    placeholder="Workouts" 
                                    name="workouts" 
                                    className={`form-control ${errors.workouts && 'is-invalid'}`} 
                                    value={this.state.workouts} 
                                    onChange={this.changeworkoutsHandler} 
                                    required
                                />
                                {errors.workouts && <div className="invalid-feedback">{errors.workouts}</div>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: '#555', marginBottom: '5px', display: 'block' }}>Meals: </label>
                                <input 
                                    placeholder="Meals" 
                                    name="meals" 
                                    className={`form-control ${errors.meals && 'is-invalid'}`} 
                                    value={this.state.meals} 
                                    onChange={this.changemealsHandler} 
                                    required
                                />
                                {errors.meals && <div className="invalid-feedback">{errors.meals}</div>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: '#555', marginBottom: '5px', display: 'block' }}>Progress: </label>
                                <input 
                                    placeholder="Progress" 
                                    name="progress" 
                                    className={`form-control ${errors.progress && 'is-invalid'}`} 
                                    value={this.state.progress} 
                                    onChange={this.changeprogressHandler} 
                                    required
                                />
                                {errors.progress && <div className="invalid-feedback">{errors.progress}</div>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: '#555', marginBottom: '5px', display: 'block' }}>Image: </label>
                                <input 
                                    type='file' 
                                    placeholder="imagefileName" 
                                    name="imagefileName" 
                                    className="form-control" 
                                    value={this.state.imagefileName} 
                                    onChange={this.changeimagefileNameHandler}
                                />
                            </div>

                            <button 
                                className="btn btn-dark" 
                                onClick={this.saveOrUpdatePosts}
                                style={{ marginRight: '10px' }}
                            >
                                Save
                            </button>
                            <Link 
                                to="/" 
                                className="btn btn-light"
                                style={{ marginLeft: '10px' }}
                            >
                                Cancel
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateMediaComponent;
