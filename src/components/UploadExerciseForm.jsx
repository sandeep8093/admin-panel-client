import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Box, makeStyles, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
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
  formControl: {
    marginBottom: theme.spacing(2),
    width: '400px'
  }
}));

const difficultyLevels = [1, 2, 3, 4, 5];
function UploadExerciseForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [languageId, setLanguageId] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [error, setError] = useState('');

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
  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const optionsArray = options.split(",").map(option => option.trim());
    const response = await axios.post(
      'https://learning-up-server.onrender.com/exercise/add',
      {
        languageId: languageId,
        difficultyLevel: difficultyLevel,
        question: question,
        options: optionsArray,
        correctAnswer: correctAnswer
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate('/exercise/list-all');
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
        Upload Exercise
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl className={classes.formControl}>
        <InputLabel id="languageId-label">Language</InputLabel>
        <Select
          labelId="languageId-label"
          id="languageId"
          value={languageId}
          onChange={(e) => setLanguageId(e.target.value)}
        >
          {languages.map((language) => (
            <MenuItem key={language._id} value={language._id}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="difficultyLevel-label">Difficulty Level</InputLabel>
        <Select
          labelId="difficultyLevel-label"
          id="difficultyLevel"
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
        >
          {difficultyLevels.map(level => (
            <MenuItem key={level} value={level}>{level}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={classes.formInput}
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <TextField
        className={classes.formInput}
        label="Options (separated by commas)"
        value={options}
        onChange={(e) => setOptions(e.target.value)}
        helperText="Enter options separated by commas"
      />
      <TextField
        className={classes.formInput}
        label="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
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

export default UploadExerciseForm;
