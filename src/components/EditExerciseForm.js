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
    marginTop: theme.spacing(12),
  },
  formInput: {
    marginBottom: theme.spacing(2),
    width: '400px',
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
}));

function EditExerciseForm() {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [languageId, setLanguageId] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExercise();
  }, []);

  const fetchExercise = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://learning-up-server.onrender.com/exercise/get-one/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (response.status === 200) {
        const { languageId, difficultyLevel, question, options, correctAnswer } = data;
        setLanguageId(languageId);
        setDifficultyLevel(difficultyLevel);
        setQuestion(question);
        setOptions(options);
        setCorrectAnswer(correctAnswer);
      } else {
        setError('Failed to fetch exercise');
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
        `https://learning-up-server.onrender.com/exercise/update/${id}`,
        {
          languageId: languageId,
          difficultyLevel: difficultyLevel,
          question: question,
          options: options,
          correctAnswer: correctAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/exercise/list-all');
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
        Edit Exercise
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        className={classes.formInput}
        label="Language ID"
        value={languageId}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        className={classes.formInput}
        label="Difficulty Level"
        value={difficultyLevel}
        onChange={(e) => setDifficultyLevel(e.target.value)}
      />
      <TextField
        className={classes.formInput}
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <TextField
        className={classes.formInput}
        label="Options (separated by commas)"
        value={options.join(', ')}
        onChange={(e) => setOptions(e.target.value.split(',').map(option => option.trim()))}
      />
      <TextField
        className={classes.formInput}
        label="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <Button className={classes.formButton} variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
}

export default EditExerciseForm;
