import React, { Component } from 'react';
import MealPlan from '../services/MealPlan';
import { Link } from 'react-router-dom';

class CreateMeal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            age: '',
            occupation: ''
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.changeOccupationHandler = this.changeOccupationHandler.bind(this);
        this.saveOrUpdateMeal = this.saveOrUpdateMeal.bind(this);
    }

    saveOrUpdateMeal = (e) => {
        e.preventDefault();
        let meal = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            occupation: this.state.occupation
        };

        MealPlan.createMeal(meal)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    }
    
    changeFirstNameHandler = (event) => {
        this.setState({ firstname: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastname: event.target.value });
    }

    changeAgeHandler = (event) => {
        this.setState({ age: event.target.value });
    }

    changeOccupationHandler = (event) => {
        this.setState({ occupation: event.target.value });
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
                                        <label> Meals: </label>
                                        <input placeholder="Enter Meals" 
                                               name="firstname" 
                                               className="form-control" 
                                            value={this.state.firstname} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Recipes: </label>
                                        <input placeholder="Enter recipes" 
                                               name="lastname" 
                                               className="form-control" 
                                            value={this.state.lastname} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Potion Size: </label>
                                        <input placeholder="Enter Potion Size" 
                                               name="age" 
                                               className="form-control" 
                                            value={this.state.age} onChange={this.changeAgeHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Nutritional Infromation: </label>
                                        <input placeholder="Enter Nutritional Information" 
                                               name="occupation" 
                                               className="form-control" 
                                            value={this.state.occupation} onChange={this.changeOccupationHandler}/>
                                    </div><br></br>
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
