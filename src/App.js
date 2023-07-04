import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import LoginForm from './components/LoginForm';
import UploadForm from './components/UploadForm';
import EditForm from './components/EditForm';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import SingleProductPage from './components/SingleProductPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/product_create" element={<UploadForm />} />
          <Route path="/product_update/:id" element={<EditForm />} />
          <Route path="/product_all" element={<ProductList />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
