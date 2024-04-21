import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
                <a className="navbar-brand" href="/y"><h1 style={{ display: "inline", margin: "0", marginRight: "20px", fontSize: "24px" }}>HealthyMate</h1></a>
                <a className="navbar-brand" href="/y"><h6 style={{ display: "inline", margin: "0", marginRight: "10px", fontSize: "14px", color: "#fff" }}>All Meal Plans</h6></a>
                <a className="navbar-brand" href="/yt"><h6 style={{ display: "inline", margin: "0", marginRight: "10px", fontSize: "14px", color: "#fff" }}>Create Meal Plans</h6></a>
                <a className="navbar-brand" href="/y"><h6 style={{ display: "inline", margin: "0", marginRight: "10px", fontSize: "14px", color: "#fff" }}>Categorize Meal Plan</h6></a>
            </nav>
        </header>
    </div>
)





}

export default HeaderComponent
