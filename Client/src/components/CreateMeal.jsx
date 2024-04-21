import React, { Component } from 'react';
import MealPlan from '../services/MealPlan';
import { Link } from 'react-router-dom';

class CreateMeal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meals: '',
            recipes: '',
            potion: '',
            info: '',
            error: '',
            successMessage: ''
        };

        this.changeMealsHandler = this.changeMealsHandler.bind(this);
        this.changeRecipesHandler = this.changeRecipesHandler.bind(this);
        this.changePotionHandler = this.changePotionHandler.bind(this);
        this.changeInfoHandler = this.changeInfoHandler.bind(this);
        this.saveOrUpdateMeal = this.saveOrUpdateMeal.bind(this);
    }

    saveOrUpdateMeal = (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            !this.state.meals ||
            !this.state.recipes ||
            !this.state.potion ||
            !this.state.info
        ) {
            this.setState({ error: 'Please fill in all fields' });
            return;
        }

        let meal = {
            meals: this.state.meals,
            recipes: this.state.recipes,
            potion: this.state.potion,
            info: this.state.info
        };

        MealPlan.createMeal(meal)
            .then(res => {
                this.setState({
                    successMessage: 'Meal plan created successfully',
                    error: ''
                });
                // Reset form fields after successful submission
                this.setState({
                    meals: '',
                    recipes: '',
                    potion: '',
                    info: ''
                });
                // Redirect to home after saving
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    }
    
    changeMealsHandler = (event) => {
        this.setState({ meals: event.target.value });
    }

    changeRecipesHandler = (event) => {
        this.setState({ recipes: event.target.value });
    }

    changePotionHandler = (event) => {
        this.setState({ potion: event.target.value });
    }

    changeInfoHandler = (event) => {
        this.setState({ info: event.target.value });
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
                            <h3 className="text-center">Add Meal Plan</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Meals:(Breakfast, Lunch, Dinner) </label>
                                        <input 
                                            placeholder="Enter Meals" 
                                            name="meals" 
                                            className="form-control" 
                                            value={this.state.meals} 
                                            onChange={this.changeMealsHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Recipes: </label>
                                        <input 
                                            placeholder="Enter recipes" 
                                            name="recipes" 
                                            className="form-control" 
                                            value={this.state.recipes} 
                                            onChange={this.changeRecipesHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Potion Size: </label>
                                        <input 
                                            placeholder="Enter Potion Size" 
                                            name="potion" 
                                            className="form-control" 
                                            value={this.state.potion} 
                                            onChange={this.changePotionHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Nutritional Infromation: </label>
                                        <input 
                                            placeholder="Enter Nutritional Information" 
                                            name="info" 
                                            className="form-control" 
                                            value={this.state.info} 
                                            onChange={this.changeInfoHandler}
                                        />
                                    </div>
                                    <br />
                                    {/* Display error message */}
                                    {this.state.error && (
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.error}
                                        </div>
                                    )}
                                    {/* Display success message */}
                                    {this.state.successMessage && (
                                        <div className="alert alert-success" role="alert">
                                            {this.state.successMessage}
                                        </div>
                                    )}
                                    <button className="btn btn-success" onClick={this.saveOrUpdateMeal}>Save</button>
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

export default CreateMeal;
