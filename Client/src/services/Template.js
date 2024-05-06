import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8086'; // Corrected base URL

class Template {

    getWorkouts(){
        return axios.get(REST_API_BASE_URL + '/users'); // Corrected endpoint
    }

    createWorkout(workout){
        return axios.post(REST_API_BASE_URL + '/save', workout); // Corrected endpoint
    }

    getWorkoutById(workoutId){
        return axios.get(REST_API_BASE_URL + '/users/' + workoutId); // Corrected endpoint
    }

    updateWorkout(workout, workoutId){
        return axios.put(REST_API_BASE_URL + '/update/' + workoutId, workout); // Corrected endpoint
    }

    deleteWorkout(workoutId){
        return axios.delete(REST_API_BASE_URL + '/delete/' + workoutId); // Corrected endpoint
    }
}

export default new WorkOut();
