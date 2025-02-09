import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setTabValue } from "../store/reducers/menu";
import { dispatch } from "../store";

function PublishComponent() {

    const navigate = useNavigate();

    const navigateToWriteTab = () => {
        navigate('/write');
        dispatch(setTabValue({tabValue:'write'}))
    };
    return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="50vh" 
          className="about-us-container"
          flexDirection={'column'}
        >
          <Typography 
            variant="h4" 
            color="textSecondary" 
            className="coming-soon"
          >
            Coming Soon
          </Typography>
          <Typography 
            variant="h6" 
            color="textSecondary" 
            className="coming-soon"
          >
       Express your thoughts in the best possible way with our tools

          </Typography>
          <Button 
            // variant="contained" 
            color="primary" 
            onClick={navigateToWriteTab}
          >
            Start Writing
      </Button>
        </Box>
      );
}

export default PublishComponent