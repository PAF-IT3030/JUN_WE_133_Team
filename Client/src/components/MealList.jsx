import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MealPlan from '../services/MealPlan';

class MealList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            loading: true,
            error: null
        };
        this.deleteMeal = this.deleteMeal.bind(this);
    }

    componentDidMount() {
        this.fetchMeals();
    }

    fetchMeals() {
        MealPlan.getMeals()
            .then((res) => {
                this.setState({ meals: res.data, loading: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: "Error fetching data", loading: false });
            });
    }

    deleteMeal(id) {
        MealPlan.deleteMeal(id)
            .then(() => {
                const updatedMeals = this.state.meals.filter(meal => meal.id !== id);
                this.setState({ meals: updatedMeals });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { meals, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Meal Plans List</h2>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <Link to="/save" className="btn btn-primary" style={{ textDecoration: "none", padding: "5px 10px", marginRight: "10px" }}>Share Your Meal Plan</Link>
                </div>
                <div className="row">
                    {meals.map(meal =>
                        <div key={meal.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Meal Plans:{meal.meals}</p>
				    <p className="card-text">Recipes: {meal.recipes}</p>
                                    <p className="card-text">Potion Size: {meal.potion}</p>
                                    <p className="card-text">Nutritional Information: {meal.info}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
    <Link to={`/view/${meal.id}`} className="btn btn-info" style={{ textDecoration: "none" }}>View</Link>
    <button onClick={() => this.deleteMeal(meal.id)} className="btn btn-danger">Delete</button>
    <Link to={`/update/${meal.id}`} className="btn btn-info" style={{ textDecoration: "none" }}>Update</Link>
    <button className="btn btn-link" style={{ marginLeft: "10px", color: "red" }}>&#x2764;</button>
    
</div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }         
}

export default MealList;
