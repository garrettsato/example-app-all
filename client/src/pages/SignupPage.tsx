import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

// Validation for the form fields
const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate(); // Initialize the navigate hook


  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError('');
    setSuccessMessage('');
    let valid = true;

    const newErrors = { email: '', password: '', confirmPassword: '' };

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate password
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);


    if (!valid) return; // Stop submission if validation fails

    // Call the API if the form is valid
    try {
      const response = await fetch("http://localhost:8090/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send form data as JSON
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Handle error response
        setApiError(data.message || 'Something went wrong');
      } else {
        // Handle success response
        setSuccessMessage('Registration successful! Welcome!');
        setTimeout(() => {
            navigate('/')

        }, 2000)
      }
    } catch (error) {
      setApiError('Network error. Please try again later.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: 'auto',
        padding: 2,
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Sign Up
      </Typography>

        {/* API Error Alert */}
        {apiError && <Alert severity="error">{apiError}</Alert>}

        {/* Success Message Alert */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        required
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;