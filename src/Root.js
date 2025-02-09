// import { Outlet } from "react-router-dom";
// import Titlebar from "./components/Titlebar";

// export default function Root() {
//   return (
//     <>
//       <Titlebar/>
//       <div id="detail">
//         <Outlet />
//       </div>
//     </>
//   );
// }

// import { Outlet, useLocation } from "react-router-dom";
// import Titlebar from "./components/Titlebar";
// import { Drawer, List, ListItem, ListItemText, Box, CssBaseline } from '@mui/material';
// import { useState } from 'react';

// // Drawer width
// const drawerWidth = 240;

// export default function Root() {
//   const location = useLocation(); // Hook to detect current route
//   const [drawerOpen, setDrawerOpen] = useState(true);

//   // Conditional rendering: check if we're on the feeds page
//   const isFeedsPage = location.pathname === "/feeds";

//   return (
//     <>
//       <CssBaseline />

//       {isFeedsPage ? (
//         // Drawer layout for FeedsComponent
//         <Box sx={{ display: 'flex' }}>
//           <Drawer
//             variant="persistent"
//             open={drawerOpen}
//             sx={{
//               width: drawerWidth,
//               flexShrink: 0,
//               '& .MuiDrawer-paper': {
//                 width: drawerWidth,
//                 boxSizing: 'border-box',
//               },
//             }}
//           >
//             <Titlebar />
//             <List>
//               {/* Add your navigation items inside the drawer */}
//               <ListItem button component="a" href="/">
//                 <ListItemText primary="Home" />
//               </ListItem>
//               <ListItem button component="a" href="/feeds">
//                 <ListItemText primary="Feeds" />
//               </ListItem>
//               <ListItem button component="a" href="/profile">
//                 <ListItemText primary="Profile" />
//               </ListItem>
//             </List>
//           </Drawer>

//           {/* Main content adjusted for drawer */}
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               p: 3,
//               ml: `${drawerWidth}px`, // Shifts the content to the right to account for the drawer
//               height: '100vh',
//               overflow: 'auto', // Ensure scrolling
//             }}
//           >
//             <Outlet />
//           </Box>
//         </Box>
//       ) : (
//         // Default layout for other pages
//         <>
//           <Titlebar />
//           <div id="detail">
//             <Outlet />
//           </div>
//         </>
//       )}
//     </>
//   );
// }



import { Outlet, useLocation } from "react-router-dom";
import Titlebar from "./components/Titlebar";
import { Drawer, Box, CssBaseline } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export default function Root() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const isFeedsPage = location.pathname === "/feeds";

  return (
    <>
      <CssBaseline />
      {isFeedsPage ? (
        <Box sx={{ display: "flex" }}>
          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {/* Use Titlebar in drawer mode */}
            <Titlebar drawerMode={true} />
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: `${drawerWidth}px`,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      ) : (
        <>
          {/* Use Titlebar in original mode for other components */}
          <Titlebar drawerMode={false} />
          <div id="detail">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
}
