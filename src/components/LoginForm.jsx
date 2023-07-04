import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(20),
    padding: theme.spacing(8),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(2),
    margin: '0 auto',
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '300px'
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://admin-panel-server-up96.onrender.com/auth/login', {
        email,
        password,
      });

      const { token } = response.data; // Assuming the token is returned in the response

      // Store the token in local storage or a state variable for future use
      localStorage.setItem('token', token);
      navigate('/product_all');
    } catch (error) {
      // Handle error when unable to make the request
      setError('An error occurred');
    }
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Login As Admin
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.textField}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.textField}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        className={classes.button}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
