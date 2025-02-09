// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardActions, Typography, IconButton, Box, Avatar, Stack } from '@mui/material';
// import { ThumbUp, Share, Comment } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { Link } from 'react-router-dom';
// // Mock data for feeds with additional details
// const feedsData = [
//   {
//     id: 1,
//     title: "How to Improve Your Writing Skills",
//     content: "Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...",
//     author: "Author 1",
//     likes: 10,
//     comments: 5,
//     timestamp: "2 hours ago",
//     avatar: "https://via.placeholder.com/50", // Mock profile image
//   },
//   {
//     id: 2,
//     title: "The Power of Consistency in Writing",
//     content: "Consistency is key when it comes to improving any skill. Set aside time each day to write something, no matter how small. Over time, you'll notice a significant improvement in your writing ability...",
//     author: "Author 2",
//     likes: 8,
//     comments: 2,
//     timestamp: "5 hours ago",
//     avatar: "https://via.placeholder.com/50", // Mock profile image
//   },
//   {
//     id: 3,
//     title: "Writing Inspiration: Where to Find It",
//     content: "Inspiration can come from the most unexpected places. If you're struggling with writer's block, take a walk, read a new book, or listen to music...",
//     author: "Author 3",
//     likes: 12,
//     comments: 3,
//     timestamp: "1 day ago",
//     avatar: "https://via.placeholder.com/50", // Mock profile image
//   },
//   {
//     id: 1,
//     title: "How to Improve Your Writing Skills",
//     content: "Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...",
//     author: "Author 1",
//     likes: 10,
//     comments: 5,
//     timestamp: "2 hours ago",
//     avatar: "https://via.placeholder.com/50", // Mock profile image
//   },
//   {
//     id: 2,
//     title: "The Power of Consistency in Writing",
//     content: "Today is the anniversary of the publication of Robert Frost’s iconic poem “Stopping by Woods on a Snowy Evening,” a fact that spurred the Literary Hub office into a long conversation about their favorite poems, the most iconic poems written in English, and which poems we should all have already read (or at least be reading next). Turns out, despite frequent (false) claims that poetry is dead and/or irrelevant and/or boring, there are plenty of poems that have sunk deep into our collective consciousness as cultural icons. (What makes a poem iconic? For our purposes here, it’s primarily a matter of cultural ubiquity, though unimpeachable excellence helps any case.) So for those of you who were not present for our epic office argument, I have listed some of them here Today is the anniversary of the publication of Robert Frost’s iconic poem “Stopping by Woods on a Snowy Evening,” a fact that spurred the Literary Hub office into a long conversation about their favorite poems, the most iconic poems written in English, and which poems we should all have already read (or at least be reading next). Turns out, despite frequent (false) claims that poetry is dead and/or irrelevant and/or boring, there are plenty of poems that have sunk deep into our collective consciousness as cultural icons. (What makes a poem iconic? For our purposes here, it’s primarily a matter of cultural ubiquity, though unimpeachable excellence helps any case.) So for those of you who were not present for our epic office argument, I have listed some of them here. Today is the anniversary of the publication of Robert Frost’s iconic poem “Stopping by Woods on a Snowy Evening,” a fact that spurred the Literary Hub office into a long conversation about their favorite poems, the most iconic poems written in English, and which poems we should all have already read (or at least be reading next). Turns out, despite frequent (false) claims that poetry is dead and/or irrelevant and/or boring, there are plenty of poems that have sunk deep into our collective consciousness as cultural icons. (What makes a poem iconic? For our purposes here, it’s primarily a matter of cultural ubiquity, though unimpeachable excellence helps any case.) So for those of you who were not present for our epic office argument, I have listed some of them here.",
//     author: "Author 2",
//     likes: 8,
//     comments: 2,
//     timestamp: "5 hours ago",
//     avatar: "https://via.placeholder.com/50", // Mock profile image
//   },
// ];

// // Styled component for the card
// const StyledCard = styled(Card)(({ theme }) => ({
//   width: '60%',
//   backgroundColor: '#fff',
//   margin: '20px auto',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   position: 'relative',
//   padding: theme.spacing(2),
//   boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
//   borderRadius: '15px',
//   textAlign: 'center', // Center the title and content
//   height: '85vh', // Set height to 85% of viewport height
// }));

// const FeedsPage = () => {
//   const [feeds, setFeeds] = useState(feedsData);
//   const [cardHeight, setCardHeight] = useState(window.innerHeight * 0.85);

//   useEffect(() => {
//     const handleResize = () => {
//       const headerHeight = 80;
//       setCardHeight(window.innerHeight - headerHeight - 20); // Adjust height considering header
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial resize on mount

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLike = (id) => {
//     const updatedFeeds = feeds.map(feed =>
//       feed.id === id ? { ...feed, likes: feed.likes + 1 } : feed
//     );
//     setFeeds(updatedFeeds);
//   };

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         overflowY: 'scroll',
//         scrollSnapType: 'y mandatory', // Snap to the next feed on scroll
//         '& > *': { scrollSnapAlign: 'start' }, // Ensure each card snaps to the start
//         backgroundColor: '#e0e0e0',
//         padding: 0,
//         margin: 0,
//       }}
//     >
//       {feeds.map(feed => (
//         <StyledCard key={feed.id} sx={{ height: `${cardHeight}px` }}>
//           {/* Profile Picture and Username at the Top */}
//           <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'absolute', top: 20, left: 20 }}>
//             <Avatar alt={feed.author} src={feed.avatar} />
//             <Stack direction="column">
//               <Typography variant="body1" fontWeight="bold">
//               <Link to={`/profile/${feed.author}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                   {feed.author}
//                 </Link>
//               </Typography>
//               <Typography variant="caption" color="text.secondary">{feed.timestamp}</Typography>
//             </Stack>
//           </Stack>

//           {/* Centered Title, Content, and Author Name */}
//           <CardContent
//             sx={{
//               flexGrow: 1,
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center', // Center content vertically
//               alignItems: 'center',
//               overflowY: feed.content.length > 200 ? 'auto' : 'hidden', // Scroll only if content is long
//             }}
//           >
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               {feed.title}
//             </Typography>
//             <Typography variant="body1" sx={{ marginTop: 2, lineHeight: 1.6 }}>
//               {feed.content}
//             </Typography>
//           </CardContent>

//           {/* Action Buttons */}
//           <CardActions
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               padding: '0 20px',
//               marginTop: 'auto',
//               borderTop: '1px solid #e0e0e0',
//             }}
//           >
//             <IconButton onClick={() => handleLike(feed.id)} color="primary">
//               <ThumbUp />
//               <Typography variant="body2" sx={{ marginLeft: 1 }}>{feed.likes}</Typography>
//             </IconButton>
//             <IconButton color="primary">
//               <Comment />
//               <Typography variant="body2" sx={{ marginLeft: 1 }}>{feed.comments}</Typography>
//             </IconButton>
//             <IconButton color="primary">
//               <Share />
//             </IconButton>
//           </CardActions>
//         </StyledCard>
//       ))}
//     </Box>
//   );
// };

// export default FeedsPage;








import React, { useState, useEffect } from 'react';
import { Box, Avatar, Stack, Typography, IconButton, Grid } from '@mui/material';
import { ThumbUp, Share, Comment, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/system';

// Mock data for feeds and user profiles
const feedsData = [
  {
    id: 1,
    title: "How to Improve Your Writing Skills",
    content: "Writing is a skill that requires constant practice. By regularly putting pen to paper, you not only sharpen your ability but also enhance creativity...",
    author: "Author 1",
    likes: 10,
    comments: 5,
    timestamp: "2 hours ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "The Power of Consistency in Writing",
    content: "Consistency is key when it comes to improving any skill...",
    author: "Author 2",
    likes: 8,
    comments: 2,
    timestamp: "5 hours ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "The Power of Consistency in Writing",
    content: "Consistency is key when it comes to improving any skill...",
    author: "Author 2",
    likes: 8,
    comments: 2,
    timestamp: "5 hours ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "The Power of Consistency in Writing",
    content: "Consistency is key when it comes to improving any skill...",
    author: "Author 2",
    likes: 8,
    comments: 2,
    timestamp: "5 hours ago",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "The Power of Consistency in Writing",
    content: "Consistency is key when it comes to improving any skill...",
    author: "Author 2",
    likes: 8,
    comments: 2,
    timestamp: "5 hours ago",
    avatar: "https://via.placeholder.com/50",
  },
  // Additional feed data...
];

const userProfiles = {
  'Author 1': {
    name:'krishn_kumar',
    bio: 'Poet | Writer | Dreamer',
    avatar: 'https://via.placeholder.com/150',
    posts: [
      { id: 1, image: 'https://via.placeholder.com/300', title: 'Post 1' },
      { id: 2, image: 'https://via.placeholder.com/300', title: 'Post 2' },
      { id: 1, image: 'https://via.placeholder.com/300', title: 'Post 1' },
      { id: 2, image: 'https://via.placeholder.com/300', title: 'Post 2' },
      { id: 1, image: 'https://via.placeholder.com/300', title: 'Post 1' },
      { id: 2, image: 'https://via.placeholder.com/300', title: 'Post 2' },
    ],
  },
  'Author 2': {
    name:'satya_kumar',
    bio: 'Storyteller and wordsmith',
    avatar: 'https://via.placeholder.com/150',
    posts: [
      { id: 1, image: 'https://via.placeholder.com/300', title: 'Post A' },
      { id: 2, image: 'https://via.placeholder.com/300', title: 'Post B' },
    ],
  },
};

const StyledCard = styled(Box)(({ theme }) => ({
  width: '60%',
  backgroundColor: '#fff',
  margin: '20px auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  padding: theme.spacing(2),
  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
  textAlign: 'center',
  height: '85vh',
}));

const FeedsPage = () => {
  const [view, setView] = useState('feeds'); // 'feeds' or 'profile'
  const [selectedAuthor, setSelectedAuthor] = useState(null); // Store selected author's profile

  const [feeds, setFeeds] = useState(feedsData);
  const [cardHeight, setCardHeight] = useState(window.innerHeight * 0.85);

  useEffect(() => {
    const handleResize = () => {
      const headerHeight = 80;
      setCardHeight(window.innerHeight - headerHeight - 20);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLike = (id) => {
    const updatedFeeds = feeds.map(feed =>
      feed.id === id ? { ...feed, likes: feed.likes + 1 } : feed
    );
    setFeeds(updatedFeeds);
  };

  const handleAuthorClick = (author) => {
    setSelectedAuthor(userProfiles[author]); // Set the selected author's profile
    setView('profile'); // Switch to profile view
  };

  const renderFeeds = () => (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        '& > *': { scrollSnapAlign: 'start' },
        backgroundColor: '#e0e0e0',
        padding: 0,
        margin: 0,
      }}
    >
      {feeds.map(feed => (
        <StyledCard key={feed.id} sx={{ height: `${cardHeight}px` }}>
          {/* Profile Picture and Username at the Top */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'absolute', top: 20, left: 20 }}>
            <Avatar alt={feed.author} src={feed.avatar} />
            <Stack direction="column">
              <Typography
                variant="body1"
                fontWeight="bold"
                onClick={() => handleAuthorClick(feed.author)}
                sx={{ cursor: 'pointer' }}
              >
                {feed.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">{feed.timestamp}</Typography>
            </Stack>
          </Stack>

          {/* Centered Title, Content */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {feed.title}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, lineHeight: 1.6 }}>
              {feed.content}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginTop: 'auto' }}>
            <IconButton onClick={() => handleLike(feed.id)} color="primary">
              <ThumbUp />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>{feed.likes}</Typography>
            </IconButton>
            <IconButton color="primary">
              <Comment />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>{feed.comments}</Typography>
            </IconButton>
            <IconButton color="primary">
              <Share />
            </IconButton>
          </Box>
        </StyledCard>
      ))}
    </Box>
  );

  const renderProfile = () => {
    if (!selectedAuthor) return null;

    return (
      <Box sx={{ padding: '20px' }}>
        {/* Profile Picture, Bio and Back Button in one line */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {/* Back Button */}
          <IconButton onClick={() => setView('feeds')} color="primary">
            <ArrowBack />
          </IconButton>
          {/* Avatar */}
          <Avatar alt={selectedAuthor.name} src={selectedAuthor.avatar} sx={{ width: 100, height: 100, marginRight: '20px' }} />
          {/* Bio */}
          <Box>
            <Typography variant="h4" fontWeight="bold">{selectedAuthor.name}</Typography>
            <Typography variant="body1">{selectedAuthor.bio}</Typography>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Posts</Typography>
        <Grid container spacing={2}>
          {selectedAuthor.posts.map(post => (
            <Grid item xs={6} sm={4} key={post.id}>
              <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '10px' }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      {/* Content Section */}
      {view === 'feeds' ? renderFeeds() : renderProfile()}
    </Box>
  );
};

export default FeedsPage;







