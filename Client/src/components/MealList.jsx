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
                <div className="y">
                    <Link to="/save" className="btn btn-primary" style={{ textDecoration: "none", padding: "5px 10px", marginRight: "10px" }}>Add Meal Plan</Link>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2", borderBottom: "2px solid #333" }}>
                                <th style={{ padding: "10px" }}>User ID</th>
                                <th style={{ padding: "10px" }}>Meal Plans</th>
                                <th style={{ padding: "10px" }}>Recipes</th>
                                <th style={{ padding: "10px" }}>Portion Size</th>
                                <th style={{ padding: "10px" }}>Nutritional Information</th>
                                
                                <th style={{ padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map(meal =>
                                <tr key={meal.id}>
                                    <td style={{ padding: "10px" }}>{meal.id}</td>
                                    <td style={{ padding: "10px" }}>{meal.firstname}</td>
                                    <td style={{ padding: "10px" }}>{meal.lastname}</td>
                                    <td style={{ padding: "10px" }}>{meal.age}</td>
                                    <td style={{ padding: "10px" }}>{meal.occupation}</td>
                                    <td style={{ padding: "10px" }}>
                                        <Link to={`/view/${meal.id}`} className="btn btn-info" style={{ marginLeft: "10px", textDecoration: "none" }}>View</Link>
                                        <button onClick={() => this.deleteMeal(meal.id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                        <Link to={`/update/${meal.id}`} className="btn btn-info" style={{ marginLeft: "10px", textDecoration: "none" }}>Update</Link>
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

export default MealList;
