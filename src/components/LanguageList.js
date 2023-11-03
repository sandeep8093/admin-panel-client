import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, List, ListItem, Button, makeStyles, Box } from '@material-ui/core';
import axios from 'axios';
import { FiberManualRecord } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  languageItem: {
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
  container: {
    maxWidth: 400,
    margin: '0 auto',
    padding: theme.spacing(2),
    fontSize: 50,
    marginTop: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  languageImage: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  colorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  colorIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  button: {
    margin: theme.spacing(0, 6),
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

function LanguageList() {
  const classes = useStyles();
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState('');
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
        const { data } = response;
        setLanguages(data);
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        setError('Failed to fetch languages');
      }
    };

    fetchLanguages();
  }, []);

  const handleDelete = async (languageId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token Not Found');
        console.log('Token not given');
      }
      const response = await axios.delete(
        `https://learning-up-server.onrender.com/language/delete/${languageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.status);
      if (response.status === 200) {
        navigate('/language/list-all');
      } else {
        setError('delete failed');
      }
    } catch (error) {
      console.error('Failed to delete language:', error);
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
          All languages
        </Typography>
      </ListItem>
      <ListItem className={classes.container}>
        <Button
          className={classes.button}
          component={Link}
          to={`/language/add`}
          variant="outlined"
          color="primary"
        >
          Create Language
        </Button>
      </ListItem>

      <Grid container spacing={2}>
        {languages.map((language) => (
          <Grid item xs={12} sm={6} md={4} key={language._id}>
            <List className={classes.languageItem}>
              <Typography component={Link} to={`/language/${language._id}`}>
                <img src={language.imageUrl} className={classes.languageImage} alt="language" />
              </Typography>
              <ListItem>
                <Typography variant="h6">{language.name}</Typography>
              </ListItem>
              {language.exercises && (
                <ListItem>
                  <Typography>Total Exercises Available: {language.exercises.length}</Typography>
                </ListItem>
              )}
              <ListItem>
                <Button
                  className={classes.button}
                  component={Link}
                  to={`/language/update/${language._id}`}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => handleDelete(language._id)}
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

export default LanguageList;
