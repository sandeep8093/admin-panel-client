import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, List, ListItem, Button, makeStyles, Box } from '@material-ui/core';
import axios from 'axios';
import { FiberManualRecord } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  productItem: {
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
    marginTop: theme.spacing(10),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productImage: {
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
  createLink: {
    textDecoration: 'none',
  },
}));

function productList() {
  const classes = useStyles();
  const [products, setproducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'https://admin-panel-server-up96.onrender.com/product/all',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
            
        // mode: 'no-cors',
        // credentials: 'same-origin',
          }
        );
        const { data } = response;
        setproducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to fetch products');
      }
    };

    fetchproducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token Not Found');
        console.log('Token not given');
      }
      const response = await axios.post(
        `https://admin-panel-server-up96.onrender.com/product/delete/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(response.status)
      if (response.status === 200) {
        // setRefreshKey(refreshKey + 1);
        // window.location.reload();
        navigate('/product_all');
      } else {
        setError('delete failed');
      }
      
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (products.length === 0) {
    return <Typography>No products available</Typography>;
  }

  return (
    <>
      <ListItem className={classes.container}>All products</ListItem>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <List className={classes.productItem}>
              <Typography component={Link} to={`/product/${product._id}`}>
               <img src={product.img} className={classes.productImage} alt="product" /> 
              </Typography>
              <ListItem>
                <Typography variant="h6">{product.title}</Typography>
              </ListItem>

              <ListItem>
                <Box className={classes.colorContainer}>
                  <Typography>Available Colors:</Typography>
                  {product.color.map((color, index) => (
                    <FiberManualRecord key={index} className={classes.colorIcon} style={{ color }} />
                  ))}
                </Box>
              </ListItem>
              <ListItem>
                <Typography>Price: ${product.price}</Typography>
              </ListItem>
              <ListItem>
                <Button
                  className={classes.button}
                  component={Link}
                  to={`/product_update/${product._id}`}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  className={classes.button}
                  component={Link} to={`/product_all`}
                  onClick={() => handleDelete(product._id)}
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

export default productList;
