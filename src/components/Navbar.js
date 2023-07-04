import React from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles,Button } from '@material-ui/core';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
  },
  toolbar: {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: 60,
    fontSize: '1.5rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    margin: theme.spacing(0, 4),
    position: 'relative',
    overflow: 'hidden',
    transition: 'color 0.3s ease-in-out',
    '&:after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      background: 'Black', // Change the color to your desired underline color
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover': {
      color: 'Black', // Change the color to your desired hover color
      '&:after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
      },
    },
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedTypography = styled(Typography)`
  animation: ${fadeIn} 0.5s ease-in;
`;

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Navigate to the login form
    navigate('/');
  };
  const isLoginForm = location.pathname === '/';
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <AnimatedTypography variant="h6" component={Link} to="/" className={classes.title}>
          ADMIN_PANEL
        </AnimatedTypography>
        <div className={classes.navLinks}>
        {!isLoginForm && (
          <AnimatedTypography variant="subtitle1" component={Link} to="/product_create" className={classes.link}>
            ADD NEW PRODUCT
          </AnimatedTypography>
          )}
          <AnimatedTypography variant="subtitle1" component={Link} to="/product_all" className={classes.link}>
            PRODUCT LIST
          </AnimatedTypography>
          {!isLoginForm && (
          <Button variant="subtitle1" color="inherit" onClick={handleLogout} className={classes.link}>
          LOGOUT
        </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
