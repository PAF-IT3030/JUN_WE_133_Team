import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
                <a className="navbar-brand" href="/y"><h1 style={{ display: "inline", margin: "0", marginRight: "20px", fontSize: "24px" }}>HealthyMate</h1></a>
                <a className="navbar-brand" href="/allmedia"><h6 style={{ display: "inline", margin: "0", marginRight: "10px", fontSize: "14px", color: "#fff" }}>All Media</h6></a>
                <a className="navbar-brand" href="/createpost"><h6 style={{ display: "inline", margin: "0", marginRight: "10px", fontSize: "14px", color: "#fff" }}>Create post</h6></a>
                
            </nav>
        </header>
    </div>
)





}

export default HeaderComponent;