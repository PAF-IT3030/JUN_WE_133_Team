import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8084'; // Corrected base URL

class MediaService {

    getMedia(){
        return axios.get(REST_API_BASE_URL + '/users'); // Corrected endpoint
    }

    createMedia(userMedia){
        return axios.post(REST_API_BASE_URL + '/save', userMedia); // Corrected endpoint
    }

    // getMediaById(MediaID){
    //     return axios.get(REST_API_BASE_URL + '/users/' + MediaID); // Corrected endpoint
    // }

    updateMedia(userMedia, MediaID){
        return axios.put(REST_API_BASE_URL + '/update/' + MediaID, userMedia); // Corrected endpoint
    }

    deleteMedia(MediaID){
        return axios.delete(REST_API_BASE_URL + '/delete/' + MediaID); // Corrected endpoint
    }
}

export default new MediaService();
