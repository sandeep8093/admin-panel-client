import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 500,
    margin: '0 auto',
    padding: theme.spacing(10),
    
  },
  productImage: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
 
}));

function SingleProductPage() {
  const { id } = useParams();
  const classes = useStyles();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the single product data based on the ID
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
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

      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Single Product Information
      </Typography>
      {/* <productViewer glbUrl={product.glbUrl} /> */}
      <img src={product.img} alt={product.title} className={classes.productImage} />
      <Typography variant="h5" gutterBottom>
         Name: {product.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
         Description: {product.desc}
      </Typography>
      <Typography variant="body1" gutterBottom>
         InStock: {product.inStock}
      </Typography>
      <Typography variant="body1" gutterBottom>
         Colors Available: {product.color.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom>
         Sizes Available: {product.size.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom>
         Categories Available: {product.categories.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom>
         Price: ${product.price}
      </Typography>
      
    </Box>
  );
}

export default SingleProductPage;
