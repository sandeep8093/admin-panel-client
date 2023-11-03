import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Box, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(12),
    padding: theme.spacing(6),
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: theme.spacing(2),
    margin: '0 auto',
  },
  formInput: {
    marginBottom: theme.spacing(2),
    width: '400px'
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
}));

function UploadLanguageForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://learning-up-server.onrender.com/language/add',
        {
          name: name,
          imageUrl: imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate('/language/list-all');
      } else {
        setError('Upload failed');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred');
    }
  };

  return (
    <Box maxWidth="sm" className={classes.container}>
      <Typography variant="h4" align="center">
        Upload Language
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        className={classes.formInput}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className={classes.formInput}
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button
        className={classes.formButton}
        variant="contained"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </Box>
  );
}

export default UploadLanguageForm;
