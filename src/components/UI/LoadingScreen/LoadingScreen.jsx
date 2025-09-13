import { useState, useEffect } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import PropTypes from "prop-types";

const LoadingPage = ({message, duration }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const linearProgressStyle = {
    '& .MuiLinearProgress-bar': {
      backgroundColor: 'rgb(5, 53, 101)',
    },
    width:"30%"
  }

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection:"column",
          alignItems: 'center',
          backgroundColor: 'white',
          gap:"25px",
          zIndex: 9999,
        }}
      >
        <img src="/IconoPagina.png" alt="" style={{height:"80px"}}/>
        <LinearProgress color="rgb(5, 53, 101)" sx={linearProgressStyle} />
       {message != "" && (
            <Typography variant="p" color="initial" sx={{fontWeight:"bold"}}>{message}...</Typography> 
       )}
      </Box>
    );
  }

  return null; 
};

LoadingPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  };

export default LoadingPage;