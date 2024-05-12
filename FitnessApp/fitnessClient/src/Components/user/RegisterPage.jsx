import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Implement your registration logic here (e.g., API call, database update)
        console.log('Registering:', fullName, email, password);
        // Redirect to home page after successful registration
        navigate('/home');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <TextField
                label="Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                margin="normal"
                fullWidth
            />
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
            <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </div>
    );
}

export default RegisterPage;
