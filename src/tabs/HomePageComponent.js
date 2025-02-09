import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, IconButton, TextField, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setTabValue, setUid } from "../store/reducers/menu";
import { dispatch } from "../store";
import { deleteContent, fetchAllContents } from "../data/fetchData";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteIcon from '@mui/icons-material/Delete'; // Importing delete icon
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setMainContent, setContentTitle } from "../store/reducers/menu";
import '../App.css';



function HomePageComponent() {
  const [contents, setContents] = useState([]);
  const { user, isAuthenticated,logout, loginWithRedirect } = useAuth0();
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState(null); 

  let filteredContents = [];
    if (!contents || !Array.isArray(contents)) filteredContents = [];
    else {
      filteredContents = contents.filter(content =>
        content.contentTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

  useEffect(() => {
    console.log(user);
    if (user) {
      fetchAllContents(user.nickname).then(data => setContents(data)); // Fetch and set contents
    }
  }, [user]);

  const handleDelete = (content) => {
    deleteContent(content._id).then(() => {
        fetchAllContents(user.nickname).then(data => setContents(data));
    });
  };



  const handleOpen = (content) => {
     dispatch(setContentTitle({contentTitle:content.contentTitle}));
     dispatch(setMainContent({mainContent:content.mainContent}));
     dispatch(setUid({uid:content.uid}));
     sessionStorage.setItem("mainContent", content.mainContent);
     sessionStorage.setItem("contentTitle", content.contentTitle);
     sessionStorage.setItem("uid", content.uid);
     navigate("/write");
     dispatch(setTabValue({ tabValue: "write" }));
  };

  const navigateToWriteTab = () => {
    navigate("/write");
    dispatch(setTabValue({ tabValue: "write" }));
  };

 
  const FullContentView = ({ content, onClose }) => (
    <>
        <div className="backdrop" onClick={onClose} /> {/* Backdrop for blur effect */}
        <Box 
            position="fixed" 
            top="50%" 
            left="50%" 
            transform="translate(-50%, -50%) rotate(0deg)" 
            bgcolor="rgb(234, 230, 205)"  
            p={4} 
            boxShadow={3} 
            zIndex={1000}
            className="full-content-view" // Add class for styling
            display="flex" // Added flex display
            flexDirection="column" // Added column direction
            alignItems="center" // Center items horizontally
            justifyContent="center"
        >
            <Typography variant="h4" align="center">{content.contentTitle}</Typography>
            <Typography variant="body1" style={{ marginTop: '16px', whiteSpace: 'pre-line' }}>{content.mainContent}</Typography>
        </Box>
    </>
);

// Add a blur effect to the background when the content view is open
useEffect(() => {
    if (selectedContent) {
        document.body.classList.add('blurred');
    } else {
        document.body.classList.remove('blurred');
    }
}, [selectedContent]);




return (
  <Box mt={4} width="100%">
    <Box mb={2} display="flex" justifyContent="center" alignItems="center">
      <TextField 
      variant="outlined" 
      placeholder="Search by title..." 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ 
          flex: 0.3, 
          marginRight: '16px',
      }}
      InputProps={{
        style: {
            borderRadius: '100px',
            border:'1px solid black'
        }
      }}
      className="centered-text-field"
      />
           <IconButton  
      onClick={navigateToWriteTab}
       >
      <AddBoxIcon fontSize="large" />
      </IconButton>
    </Box>
  {selectedContent && (
            <FullContentView 
                content={selectedContent} 
                onClose={() => setSelectedContent(null)} // Close function
            />
  )}
  <Box display="flex" flexWrap="wrap" justifyContent="space-between" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
  {filteredContents.map(content => (
      <Card key={content._id} onClick={() => setSelectedContent(content)} variant="outlined" style={{ marginBottom: '16px', width: '30%', margin: '10px', backgroundColor: "rgb(234, 230, 205)", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", borderRadius: "8px" }}> 
      <CardContent style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '8px', borderRadius: '4px' }}>
              <Typography variant="caption" color="textSecondary">
                  {new Date(content.createdAt).toLocaleDateString()}
              </Typography>
              <Box>
                  <IconButton onClick={() => handleOpen(content)}>
                      <OpenInNewIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(content)}>
                      <DeleteIcon />
                  </IconButton>
              </Box>
          </Box>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', marginTop: '8px' }}> 
              {content.contentTitle}
          </Typography>
          <Typography  variant="body2" color="textSecondary" style={{ marginTop: '4px', lineHeight: '1.5' }}>
              {content.mainContent.length > 300 ? `${content.mainContent.substring(0, 300)}...` : content.mainContent}
          </Typography>
      </CardContent>
      </Card>
  ))}
  </Box>
  </Box>
);
}


export default HomePageComponent;
