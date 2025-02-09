import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, Grid, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setTabValue } from "../store/reducers/menu";
import { dispatch } from "../store";
import { styled } from '@mui/system';
import { ThumbUp, Share, Comment } from '@mui/icons-material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const StyledCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const DetailedFeed = ({ post, onClose }) => (
  <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '35%',
      height: '75vh',
      backgroundColor: '#fff',
      zIndex: 1001, // Ensure it's on top of the backdrop
      borderRadius: '15px',
      boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 2,
      overflowY: 'auto',
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={post.author} src={post.avatar} />
      <Stack direction="column">
        <Typography variant="body1" fontWeight="bold">{post.author}</Typography>
        <Typography variant="caption" color="text.secondary">{post.timestamp}</Typography>
      </Stack>
    </Stack>

    <Box sx={{ flexGrow: 1, mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>{post.title}</Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>{post.content}</Typography>
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginTop: 'auto' }}>
      <IconButton color="primary">
        <ThumbUp />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>{post.likes}</Typography>
      </IconButton>
      <IconButton color="primary">
        <Comment />
        <Typography variant="body2" sx={{ marginLeft: 1 }}>{post.comments}</Typography>
      </IconButton>
      <IconButton color="primary">
        <Share />
      </IconButton>
    </Box>
  </Box>
);

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    profilePhoto: 'https://via.placeholder.com/150',
    username: 'unique_username',
    bio: 'धागे दिल के, उलझायेंगे मिल के\nAbout us? Three friends, sharing our passion for poetry...',
  });
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profileDetails.profilePhoto);

  const navigateToWriteTab = () => {
    navigate('/write');
    dispatch(setTabValue({ tabValue: 'write' }));
  };

  const handleEditProfileOpen = () => {
    setEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
        setProfileDetails(prevDetails => ({
          ...prevDetails,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    // Save the profile details (e.g., send to server)
    setEditProfileOpen(false);
  };

  // Sample data
  const user = {
    profilePhoto: 'https://via.placeholder.com/150',
    username: 'unique_username',
    bio: 'धागे दिल के, उलझायेंगे मिल के\nAbout us? Three friends, sharing our passion for poetry...',
    totalPosts: 20,
    publishedPosts: 13,
    posts: [
      {
        id: 1,
        title: 'How to Improve Your Writing Skills',
        content: 'Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        timestamp: '2 hours ago',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        id: 1,
        title: 'How to Improve Your Writing Skills',
        content: 'Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        timestamp: '2 hours ago',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        id: 1,
        title: 'How to Improve Your Writing Skills',
        content: 'Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        timestamp: '2 hours ago',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        id: 1,
        title: 'How to Improve Your Writing Skills',
        content: 'Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        timestamp: '2 hours ago',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        id: 1,
        title: 'How to Improve Your Writing Skills',
        content: 'Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        timestamp: '2 hours ago',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        id: 1,
        title: 'How to Improve Your Writing Skills',
        content: 'Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        timestamp: '2 hours ago',
        avatar: 'https://via.placeholder.com/50',
      },
      // Add more posts here as needed
    ]
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Main Content: Profile and Posts */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '20px',
          filter: selectedPost ? 'blur(5px)' : 'none', // Apply blur only when a post is selected
          transition: 'filter 0.3s ease', // Smooth transition for blur effect
        }}
      >
        {/* Profile Info Section */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          mb={4}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
            gap: 2, // Space between avatar and info
          }}
        >
          <Avatar
            src={user.profilePhoto}
            alt={user.username}
            sx={{
              width: 150,
              height: 150,
            }}
          />
          <Box flexGrow={1} textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography variant="h5" fontWeight="bold">{user.username}</Typography>
            <Typography variant="body1" mb={2}>{user.bio}</Typography>
            <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-start' }} gap={3} mb={2}>
              <Typography variant="body2"><strong>{user.totalPosts}</strong> posts</Typography>
              <Typography variant="body2"><strong>{user.publishedPosts}</strong> published</Typography>
            </Box>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleEditProfileOpen}>
              Edit Profile
            </Button>
            <Button variant="contained" color="primary" onClick={navigateToWriteTab}>
              Start Writing
            </Button>
          </Box>
        </Box>

        {/* Posts Section */}
        <Grid container spacing={1}>
          {user.posts.map(post => (
            <Grid item xs={4} key={post.id}>
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  padding: 2,
                  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
                onClick={() => handlePostClick(post)}
              >
                <Typography variant="h6" fontWeight="bold">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">{post.content.substring(0, 100)}...</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal: Detailed Post */}
      {selectedPost && (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000, // The backdrop should be behind the modal
            }}
            onClick={handleClose}
          />

          <DetailedFeed post={selectedPost} onClose={handleClose} />
        </>
      )}
      {/* <Dialog open={editProfileOpen} onClose={handleEditProfileClose} maxWidth="md">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ width: '500px' }}> 
          <Stack spacing={2}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Avatar
                src={profilePhotoPreview}
                alt="Profile Preview"
                sx={{ width: 150, height: 150, mb: 2 }}
              />
            </Box>
            <Button variant="contained" component="label">
              Upload Profile Photo
              <input type="file" hidden accept="image/*" onChange={handleProfilePhotoChange} />
            </Button>
            <TextField
              label="Username"
              name="username"
              value={profileDetails.username}
              onChange={handleProfileChange}
              fullWidth
            />
            <TextField
              label="Bio"
              name="bio"
              value={profileDetails.bio}
              onChange={handleProfileChange}
              multiline
              rows={4}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProfileClose}>Cancel</Button>
          <Button onClick={handleProfileSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog> */}

      <Dialog open={editProfileOpen} onClose={handleEditProfileClose} maxWidth="md">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ width: '500px' }}> 
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Avatar
                src={profilePhotoPreview}
                alt="Profile Preview"
                sx={{ width: 150, height: 150, mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Upload Profile Photo
                <input type="file" hidden accept="image/*" onChange={handleProfilePhotoChange} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                value={profileDetails.username}
                onChange={handleProfileChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={profileDetails.gender || ''}
                  onChange={handleProfileChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                name="bio"
                value={profileDetails.bio}
                onChange={handleProfileChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile Number"
                name="mobile"
                value={profileDetails.mobile || ''}
                onChange={handleProfileChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                value={profileDetails.age || ''}
                onChange={handleProfileChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Hobbies"
                name="hobbies"
                value={profileDetails.hobbies || ''}
                onChange={handleProfileChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Languages"
                name="languages"
                value={profileDetails.languages || ''}
                onChange={handleProfileChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProfileClose}>Cancel</Button>
          <Button onClick={handleProfileSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileComponent;