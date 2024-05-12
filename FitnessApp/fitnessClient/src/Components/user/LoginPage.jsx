import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement your login logic here (e.g., API call, authentication)
        console.log('Logging in with:', email, password);
        // Redirect to home page after successful login
        navigate('/home');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
                Don't have an account? <Link to="/register">Register</Link>
            </Typography>
        </div>
    );
}

export default LoginPage;
