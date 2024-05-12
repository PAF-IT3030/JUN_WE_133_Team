import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MediaService from '../services/MediaService';

class ListMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersMedia: [],
            loading: true,
            error: null
        };
        this.deleteMedia = this.deleteMedia.bind(this);
    }

    componentDidMount() {
        this.fetchMedia();
    }

    fetchMedia() {
        MediaService.getMedia()
            .then((res) => {
                this.setState({ usersMedia: res.data, loading: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error: "Error fetching data", loading: false });
            });
    }

    deleteMedia(id) {
        MediaService.deleteMedia(id)
            .then(() => {
                const updatedMedia = this.state.usersMedia.filter(userMedia => userMedia.id !== id);
                this.setState({ usersMedia: updatedMedia });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { usersMedia, loading, error } = this.state;

        return (
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Media List</h2>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <Link to="/save" className="btn btn-primary" style={{ textDecoration: "none", padding: "5px 10px", marginRight: "10px", textAlign:"right" }}>Add Post</Link>
                </div>
                <div className="row">
                    {usersMedia.map(userMedia =>
                        <div key={userMedia.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Fitness Activity: {userMedia.fitness_act}</p>
                                    <p className="card-text">Workouts: {userMedia.workouts}</p>
                                    <p className="card-text">Meals: {userMedia.meals}</p>
                                    <p className="card-text">Progress: {userMedia.progress}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                        <button onClick={() => this.deleteMedia(userMedia.id)} className="btn delete-button">Delete</button>
                                        <Link to={`/update/${userMedia.id}`} className="btn" style={{ textDecoration: "none", backgroundColor: "#000", color: "#fff" }}>Update</Link>
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

export default ListMedia;
