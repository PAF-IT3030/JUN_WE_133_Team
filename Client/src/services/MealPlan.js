import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8084'; // Corrected base URL

class MealPlan {

    getMeals(){
        return axios.get(REST_API_BASE_URL + '/users'); // Corrected endpoint
    }

    createMeal(meal){
        return axios.post(REST_API_BASE_URL + '/save', meal); // Corrected endpoint
    }

    getMealById(mealId){
        return axios.get(REST_API_BASE_URL + '/users/' + mealId); // Corrected endpoint
    }

    updateMeal(meal, mealId){
        return axios.put(REST_API_BASE_URL + '/update/' + mealId, meal); // Corrected endpoint
    }

    deleteMeal(mealId){
        return axios.delete(REST_API_BASE_URL + '/delete/' + mealId); // Corrected endpoint
    }
}

export default new MealPlan();
