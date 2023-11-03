import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, List, ListItem, Button, makeStyles, Box } from '@material-ui/core';
import axios from 'axios';
import { FiberManualRecord } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  exerciseItem: {
    border: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing(1),
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  button: {
    margin: theme.spacing(0, 3), // Added margin between buttons
  },
  updateButton: {
    marginRight: theme.spacing(2), // Added margin between Update and Delete buttons
  },
  colorIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  titleContainer: {
    background: '#f0f0f0',
    padding: theme.spacing(4),
    marginTop: theme.spacing(10),
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
}));

function ExerciseList() {
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://learning-up-server.onrender.com/language/list-all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLanguages(response.data);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        setError('Failed to fetch languages');
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = async (languageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://learning-up-server.onrender.com/exercise/get?languageId=${languageId}&level=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExercises(response.data);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      setError('Failed to fetch exercises');
    }
  };

  const handleDelete = async (exerciseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token Not Found');
        console.log('Token not given');
      }
      const response = await axios.delete(
        `https://learning-up-server.onrender.com/exercise/delete/${exerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/exercise/list-all');
      } else {
        setError('delete failed');
      }
    } catch (error) {
      console.error('Failed to delete exercise:', error);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (languages.length === 0) {
    return <Typography>No languages available</Typography>;
  }

  return (
    <>
      <ListItem className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          All Exercises
        </Typography>
      </ListItem>
      <Box style={{ margin: '20px 0', textAlign: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: '10px' }}>
          Select Language:
        </Typography>
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
            maxWidth: '100%',
          }}
        >
          <option value="" style={{ display: 'none' }}>
            Select a language
          </option>
          {languages.map((language) => (
            <option key={language._id} value={language._id}>
              {language.name}
            </option>
          ))}
        </select>
      </Box>

      <ListItem className={classes.container}>
        <Button
          className={classes.button}
          component={Link}
          to={`/exercise/add`}
          variant="outlined"
          color="primary"
        >
          Create New Exercise
        </Button>
      </ListItem>

      <Grid container spacing={2}>
        {exercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} key={exercise._id}>
            <List className={classes.exerciseItem}>
              <ListItem>
                <Typography variant="h6">{exercise.question}</Typography>
              </ListItem>
              <ListItem>
                <List>
                  {exercise.options.map((option, index) => (
                    <ListItem key={index}>
                      <FiberManualRecord className={classes.colorIcon} />
                      <Typography>{option}</Typography>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
              <ListItem>
                <Typography>Correct Answer: {exercise.correctAnswer}</Typography>
              </ListItem>

              <ListItem>
                <Button
                  className={classes.updateButton}
                  component={Link}
                  to={`/exercise/update/${exercise._id}`}
                  variant="outlined"
                  color="primary"
                >
                  Update
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => handleDelete(exercise._id)}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ExerciseList;
