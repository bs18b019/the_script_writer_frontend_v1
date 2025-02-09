import React, { useState } from 'react';
import { Box, Typography, Autocomplete, TextField, Card, CardContent, IconButton } from '@mui/material';
import { Favorite, Share, Comment } from '@mui/icons-material';

const writings = [
  {
    id: 1,
    date: '14/09/2024',
    title: 'khwab',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Kumar Vishwas',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Atif Aslam',
    category: 'Song'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Besabar',
    content: 'Ab to nikal aa khud ke andar se ghar me saman ki jarurat hai',
    author: 'Jaun Elia',
    category: 'Shayri'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  {
    id: 1,
    date: '14/09/2024',
    title: 'Tune ye kya kita',
    content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
    author: 'Author 1',
    category: 'Poem'
  },
  // Add more writings here
];

const categories = ['Poem', 'Shayri', 'Song'];
const authors = ['Jaun Elia', 'Jubin Nautyal', 'Rahat Indori', 'Atif Aslam', 'Kumar Vishwas'];

function ReadComponent() {
  const [filters, setFilters] = useState({
    author: null, // Change to null for Autocomplete
    category: null, // Change to null for Autocomplete
    date: ''
  });

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredWritings = writings.filter(writing => {
    return (
      (filters.author === null || writing.author.includes(filters.author)) &&
      (filters.category === null || writing.category === filters.category) &&
      (filters.date === '' || writing.date === filters.date)
    );
  });

  const [likedWritings, setLikedWritings] = useState(new Set());

  const handleLikeToggle = (id) => {
    const newLikedWritings = new Set(likedWritings);
    if (newLikedWritings.has(id)) {
      newLikedWritings.delete(id);
    } else {
      newLikedWritings.add(id);
    }
    setLikedWritings(newLikedWritings);
  };

  // return (
  //   <Box p={3}>
  //     <Typography variant="h4" gutterBottom>
  //       Read Writings
  //     </Typography>
  //     <Box display="flex" gap={2} mb={3}>
  //       <Autocomplete
  //         sx={{width:'15%'}}
  //         options={authors}
  //         value={filters.author}
  //         onChange={(event, newValue) => handleFilterChange('author', newValue)}
  //         renderInput={(params) => <TextField {...params} label="Author" variant="outlined" />}
  //         isOptionEqualToValue={(option, value) => option === value} // Ensure correct comparison
  //       />
  //       <Autocomplete
  //         sx={{width:'15%'}}
  //         options={categories}
  //         value={filters.category}
  //         onChange={(event, newValue) => handleFilterChange('category', newValue)}
  //         renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
  //         isOptionEqualToValue={(option, value) => option === value} // Ensure correct comparison
  //       />
  //     </Box>
  //     <Box display="flex" flexWrap="wrap" gap={2}>
  //       {filteredWritings.map((writing) => (
  //         <Card key={writing.id} sx={{ width: '30%' }}>
  //           <CardContent>
  //             <Typography variant="h6" gutterBottom>
  //               {writing.title}
  //             </Typography>
  //             <Typography variant="body2" color="textSecondary" paragraph>
  //               {writing.content}
  //             </Typography>
  //             <Box display="flex" justifyContent="space-between">
  //               <IconButton>
  //                 <Favorite />
  //               </IconButton>
  //               <IconButton>
  //                 <Share />
  //               </IconButton>
  //               <IconButton>
  //                 <Comment />
  //               </IconButton>
  //             </Box>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </Box>
  //   </Box>
  // );

  return (
    <Box p={3} sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Read Writings
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <Autocomplete
          sx={{ width: '15%' }}
          options={authors}
          value={filters.author}
          onChange={(event, newValue) => handleFilterChange('author', newValue)}
          renderInput={(params) => <TextField {...params} label="Author" variant="outlined" />}
        />
        <Autocomplete
          sx={{ width: '15%' }}
          options={categories}
          value={filters.category}
          onChange={(event, newValue) => handleFilterChange('category', newValue)}
          renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {filteredWritings.map((writing) => (
          <Card key={writing.id} sx={{ width: '30%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#555' }}>
                {writing.title || 'Untitled'}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {writing.content}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <IconButton onClick={() => handleLikeToggle(writing.id)}>
                  <Favorite color={likedWritings.has(writing.id) ? 'red' : 'red'} />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
                <IconButton>
                  <Comment />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ReadComponent;




// import React, { useState } from 'react';
// import { Box, Typography, Autocomplete, TextField, Card, CardContent, IconButton } from '@mui/material';
// import { Favorite, Share, Comment } from '@mui/icons-material';

// const writings = [
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'khwab',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Kumar Vishwas',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Atif Aslam',
//     category: 'Song'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Besabar',
//     content: 'Ab to nikal aa khud ke andar se ghar me saman ki jarurat hai',
//     author: 'Jaun Elia',
//     category: 'Shayri'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   {
//     id: 1,
//     date: '14/09/2024',
//     title: 'Tune ye kya kita',
//     content: 'Jo khwabo khayalon me socha nahi tha Tune mujhe itna pyaar diya...',
//     author: 'Author 1',
//     category: 'Poem'
//   },
//   // Add more writings here
// ];

// const categories = ['Poem', 'Shayri', 'Song'];
// const authors = ['Jaun Elia', 'Jubin Nautyal', 'Rahat Indori', 'Atif Aslam', 'Kumar Vishwas'];

// function ReadComponent() {
//   const [filters, setFilters] = useState({
//     author: null,
//     category: null,
//     date: ''
//   });

//   const handleFilterChange = (name, value) => {
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   const filteredWritings = writings.filter(writing => {
//     return (
//       (filters.author === null || writing.author.includes(filters.author)) &&
//       (filters.category === null || writing.category === filters.category) &&
//       (filters.date === '' || writing.date === filters.date)
//     );
//   });

//   // State to track liked writings
//   const [likedWritings, setLikedWritings] = useState(new Set());

//   const handleLikeToggle = (id) => {
//     const newLikedWritings = new Set(likedWritings);
//     if (newLikedWritings.has(id)) {
//       newLikedWritings.delete(id);
//     } else {
//       newLikedWritings.add(id);
//     }
//     setLikedWritings(newLikedWritings);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Read Writings
//       </Typography>
//       <Box display="flex" gap={2} mb={3}>
//         <Autocomplete
//           sx={{ width: '15%' }}
//           options={authors}
//           value={filters.author}
//           onChange={(event, newValue) => handleFilterChange('author', newValue)}
//           renderInput={(params) => <TextField {...params} label="Author" variant="outlined" />}
//         />
//         <Autocomplete
//           sx={{ width: '15%' }}
//           options={categories}
//           value={filters.category}
//           onChange={(event, newValue) => handleFilterChange('category', newValue)}
//           renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
//         />
//       </Box>
//       <Box display="flex" flexWrap="wrap" gap={2}>
//         {filteredWritings.map((writing) => (
//           <Card key={writing.id} sx={{ width: '30%' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 {writing.title}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" paragraph>
//                 {writing.content}
//               </Typography>
//               <Box display="flex" justifyContent="space-between">
//                 <IconButton onClick={() => handleLikeToggle(writing.id)}>
//                   <Favorite color={likedWritings.has(writing.id) ? 'red' : 'inherit'} />
//                 </IconButton>
//                 <IconButton>
//                   <Share />
//                 </IconButton>
//                 <IconButton>
//                   <Comment />
//                 </IconButton>
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default ReadComponent;
