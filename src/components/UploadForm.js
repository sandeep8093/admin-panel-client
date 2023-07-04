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
  TextField:{
    width: '300px'
  },
  formInput: {
    marginBottom: theme.spacing(2),
    width: '400px'
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
}));

function UploadForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [color, setColor] = useState([]);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [inStock,setInStock]=useState(true);

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (price <= 0) {
        setError('Price must be greater than 0');
      }
      const response = await axios.post(
        `https://admin-panel-server-up96.onrender.com/product/create`,
        {
          title: title,
          desc: desc,
          img: img,
          color: color,
          size: size,
          price: price,
          categories:categories,
          inStock:inStock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      if (response.status === 200) {
        navigate('/product_all');
      } else {
        setError('Upload failed');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred');
    }
  };

  return (
    <Box maxWidth="sm" className={classes.container}>
      <Typography variant="h4" align="center">
        Upload product
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        className={classes.formInput}
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        className={classes.formInput}
        label="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      
      <TextField
        className={classes.formInput}
        label="IMG URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <TextField
        className={classes.formInput}
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value.split(','))}
      />
      <TextField
        className={classes.formInput}
        label="Available Size"
        value={size}
        onChange={(e) => setSize(e.target.value.split(','))}
      />
      <TextField
        className={classes.formInput}
        label="Available Category"
        value={categories}
        onChange={(e) => setCategories(e.target.value.split(','))}
      />
      <TextField
        className={classes.formInput}
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
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

export default UploadForm;
