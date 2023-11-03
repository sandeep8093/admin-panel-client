import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import LoginForm from './components/LoginForm';
import UploadExerciseForm from './components/UploadExerciseForm';
import EditExerciseForm from './components/EditExerciseForm';
import UploadLanguageForm from './components/UploadLanguageForm';
import EditLanguageForm from './components/EditLanguageForm';
import LanguageList from './components/LanguageList';
import ExerciseList from './components/ExerciseList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/exercise/add" element={<UploadExerciseForm />} />
          <Route path="/exercise/update/:id" element={<EditExerciseForm />} />
          <Route path="/language/add" element={<UploadLanguageForm />} />
          <Route path="/language/update/:id" element={<EditLanguageForm />} />
          <Route path="/language/list-all" element={<LanguageList />} />
          <Route path="/exercise/list-all" element={<ExerciseList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
