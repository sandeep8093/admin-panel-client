import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Typography, Box, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(15),
        padding: theme.spacing(6),
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: theme.spacing(2),
        margin: '0 auto',
        marginTop:theme.spacing(12)
      },
      formInput: {
        marginBottom: theme.spacing(2),
        width: '400px'
      },
      formButton: {
        marginTop: theme.spacing(2),
      },
}));

function EditLanguageForm() {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLanguage();
  }, []);

  const fetchLanguage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://learning-up-server.onrender.com/language/list-one/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (response.status === 200) {
        const { name, imageUrl } = data;
        setName(name);
        setImageUrl(imageUrl);
      } else {
        setError('Failed to fetch language');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred');
    }
  };

  const handleUpdate = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://learning-up-server.onrender.com/language/update/${id}`,
        {
          name: name,
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/language/list-all');
      } else {
        setError('Update failed');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred');
    }
  };

  return (
    <Box maxWidth="sm" className={classes.container}>
      <Typography variant="h4" align="center">
        Edit Language
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
        onClick={handleUpdate}
      >
        Update
      </Button>
    </Box>
  );
}

export default EditLanguageForm;
