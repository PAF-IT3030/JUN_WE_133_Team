import React from 'react';

const HeaderComponent = () => {
  return (
    <header style={{ backgroundColor: '#343a40', padding: '10px 0', marginBottom: '20px' }}>
      <nav className='navbar navbar-dark'>
      <a className="navbar-brand d-flex align-items-center justify-content-center" href="/y" style={{ textDecoration: 'none', color: '#fff', flex: '1' }}>
          <h1 style={{ margin: '0', fontSize: '24px' }}>HealthyMate</h1>
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px', fontSize: '16px' }}>
              All WorkOuts Plans
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/tm" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px', fontSize: '16px' }}>
              Templates
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
