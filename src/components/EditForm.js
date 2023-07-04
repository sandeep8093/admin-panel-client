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
    marginTop: theme.spacing(5),
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

function EditForm() {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [color, setColor] = useState([]);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState('');
  console.log(id)
  useEffect(() => {
    fetchproduct();
  }, []);

  const fetchproduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://admin-panel-server-up96.onrender.com/product/oneProduct/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      // const response = await axios.post(`http://localhost:2030/product/oneproduct/${id}`);
      if (response.status === 200) {
        const { title, desc, img, color, size,categories, price,inStock } = response.data;
        setTitle(title);
        setDesc(desc);
        setImg(img);
        setColor(color);
        setCategories(categories);
        setPrice(price);
        setSize(size);
        setInStock(inStock)
      } else {
        setError('Failed to fetch product');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred');
    }
  };

  const handleUpdate = async () => {
    try {
      setError('');
      if (price <= 0) {
        setError('Price must be greater than 0');
      }
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://admin-panel-server-up96.onrender.com/product/update/${id}`,
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
        setError('Update failed');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred');
    }
  };

  return (
    <Box maxWidth="sm" className={classes.container}>
      <Typography variant="h4" align="center">
        Edit Product
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
      <TextField
        className={classes.formInput}
        label="In Stock"
        value={inStock}
        type="bool"
        onChange={(e) => setInStock(e.target.value)}
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

export default EditForm;
