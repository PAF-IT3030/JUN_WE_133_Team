import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <footer className="footer" style={{ position: "fixed", bottom: "0", width: "100%", backgroundColor: "#333", color: "#fff", textAlign: "center", padding: "10px 0" }}>
                    <span>@HealthyMate 2024</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;