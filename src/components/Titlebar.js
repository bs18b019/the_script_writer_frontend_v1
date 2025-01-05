// import React, {  useEffect } from "react";
// import { Box, Typography, Toolbar } from "@mui/material";
// import { Grid, Stack, Divider, Button } from "@mui/material";
// import { Tabs, Tab } from "@mui/material";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { setContentTitle, setMainContent, setTabValue , setUid} from "../store/reducers/menu";
// import { dispatch } from "../store";
// import { v4 as uuidv4 } from 'uuid';
// import { current } from "@reduxjs/toolkit";


// export default function Titlebar() {

//   const {tabValue} = useSelector((state) => state.menu);
//   const { user, isAuthenticated,logout, loginWithRedirect } = useAuth0();
//   const navigate = useNavigate(); 
  
//   useEffect(() => {
//     const savedTabValue = sessionStorage.getItem("tabValue");
//     const savedUid = sessionStorage.getItem("uid");
//     if (savedTabValue) {
//       dispatch(setTabValue({ tabValue: savedTabValue }));
//       navigate(savedTabValue);
//     }
//     if(savedUid){
//       dispatch(setUid({ uid: savedUid }));
//     }

//     const handlePopState = () => {
//       let currentPath = window.location.pathname;
//       currentPath = currentPath.substring(1);
//       console.log(currentPath);
//       dispatch(setTabValue({ tabValue: currentPath }));
//     };

//     window.addEventListener("popstate", handlePopState);
    
//     // Cleanup event listener on unmount
//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };

//   }, [dispatch, navigate]);

//   useEffect(()=>{
//     sessionStorage.setItem("tabValue",tabValue)
//   },[tabValue])

//   const handleChange = (event, newValue) => {
//     if (newValue === "write") {
//       if(tabValue === "write") return;
//       const uniqueId = uuidv4(); // Generate a unique ID
//       dispatch(setUid({ uid: uniqueId }));
//       sessionStorage.setItem("uid", uniqueId);
//     }
//     // sessionStorage.setItem("tabValue", newValue);
//     dispatch(setMainContent({ mainContent: "" }));
//     dispatch(setContentTitle({ contentTitle: "" }));
//     sessionStorage.setItem("mainContent", "");
//     sessionStorage.setItem("contentTitle", "");
//     dispatch(setTabValue({ tabValue: newValue }));
//     navigate(newValue);
//   };


//   return (
//     <div>
//       <Box
//         style={{ padding: "3px 10px", backgroundColor: "white" }}
//         className="mainCardContainer"
//       >
//         <Grid
//           container
//           justifyContent="space-between"
//           style={{ padding: "0px" }}
//         >
//           <Grid item style={{ padding: "0px 0px", marginRight: "auto" }}>
//             <Stack direction="column">
//               <Stack direction="row">
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontWeight: 400,
//                     padding: "5px 0px",
//                     marginTop: "10px",
//                     fontSize: "24px",
//                   }}
//                 >
//                   Writtings Mangaer
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     color: "#1890ff",
//                     fontWeight: 500,
//                     padding: "0px 0px",
//                     fontSize: "20px",
//                   }}
//                 ></Typography>
//               </Stack>
//               <Stack direction="row">
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     padding: "5px 0px",
//                     fontSize: "17px",
//                   }}
//                 >
//                   Think and improve your writtings with our accessories
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Grid>
//           <Toolbar>
//             <Tabs
//               value={tabValue}
//               onChange={handleChange}
//               aria-label="navigation tabs"
//             >
//               <Tab label="Home" value="" />
//               <Tab label="Write" value="write" />
//               <Tab label="Read" value="read" />
//               <Tab label="Feeds" value="feeds" />
//               <Tab label="About Us" value="About-us" />
//               <Tab label="Publish" value="Publish" />
//               <Tab label="Explore" value="Explore" />
//             </Tabs>
//           </Toolbar>
//           <Grid item style={{ padding: "10px 0px" }}>
//             {isAuthenticated ? (
//               <Stack direction="column" spacing={1}>
//                 <Typography variant="h6">
//                   Welcome,{" "}
//                   <Typography
//                     component="span"
//                     sx={{ fontWeight: 500, color: "primary.main" }}
//                   >
//                     {user ? user.nickname : ""}
//                   </Typography>
//                 </Typography>
//                 <Stack
//                   direction="row"
//                   justifyContent="flex-end"
//                   alignItems="center"
//                 >
//                   <Typography
//                     variant="caption"
//                     sx={{ color: "text.secondary", mr: 2 }}
//                   >
//                     {new Date().toLocaleString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       second: "2-digit",
//                     })}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       fontStyle: "italic",
//                       cursor: "pointer",
//                       color: "primary.main",
//                     }}
//                     onClick={() => logout({ returnTo: window.location.origin })}
//                   >
//                     Log Out
//                   </Typography>
//                 </Stack>
//               </Stack>
//             ) : (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => loginWithRedirect()}
//                 sx={{ mt: 2 }}
//               >
//                 Log In
//               </Button>
//             )}
//           </Grid>
//         </Grid>
//       </Box>
//       <Divider style={{ backgroundColor: "#FAA300", height: "12px" }} />
//     </div>
//   );
// }

// // export default Titlebar;












import React, { useEffect } from "react";
import { Box, Typography, Toolbar, Tabs, Tab, Button, Stack, Grid, Divider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setContentTitle, setMainContent, setTabValue, setUid } from "../store/reducers/menu";
import { v4 as uuidv4 } from "uuid";

export default function Titlebar({ drawerMode }) {
  const { tabValue } = useSelector((state) => state.menu);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTabValue = sessionStorage.getItem("tabValue");
    if (savedTabValue) {
      dispatch(setTabValue({ tabValue: savedTabValue }));
      navigate(savedTabValue);
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname.slice(1);
      dispatch(setTabValue({ tabValue: currentPath }));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [dispatch, navigate]);

  const handleChange = (event, newValue) => {
    if (newValue === "write") {
      const uniqueId = uuidv4(); // Generate a unique ID
      dispatch(setUid({ uid: uniqueId }));
      sessionStorage.setItem("uid", uniqueId);
      sessionStorage.setItem("contentTitle", "");
      sessionStorage.setItem("mainContent", "");
      dispatch(setContentTitle({ contentTitle: "" }));
      dispatch(setMainContent({ mainContent: "" }));
    }
    dispatch(setTabValue({ tabValue: newValue }));
    navigate(newValue);
  };

  return (
    <div>
      {drawerMode ? (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          {/* Drawer Mode: Vertical Tabs */}
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleChange}
            aria-label="navigation tabs"
          >
            <Tab label="Home" value="" />
            <Tab label="Write" value="write" />
            <Tab label="Read" value="read" />
            <Tab label="Feeds" value="feeds" />
            <Tab label="Profile" value="profile" />
            <Tab label="About Us" value="about-us" />
            <Tab label="Publish" value="publish" />
            <Tab label="Explore" value="explore" />
          </Tabs>
        </Box>
      ) : (
        <Box
          style={{ padding: "3px 10px", backgroundColor: "white" }}
          className="mainCardContainer"
        >
          {/* Original Mode: Horizontal Tabs */}
          <Grid container justifyContent="space-between" style={{ padding: "0px" }}>
            <Grid item style={{ padding: "0px 0px", marginRight: "auto" }}>
              <Stack direction="column">
                <Stack direction="row">
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 400,
                      padding: "5px 0px",
                      marginTop: "10px",
                      fontSize: "24px",
                    }}
                  >
                    Writings Manager
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="h6"
                    sx={{
                      padding: "5px 0px",
                      fontSize: "17px",
                    }}
                  >
                    Think and improve your writings with our accessories
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Toolbar>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="navigation tabs"
              >
                <Tab label="Home" value="" />
                <Tab label="Write" value="write" />
                <Tab label="Read" value="read" />
                <Tab label="Feeds" value="feeds" />
                <Tab label="Profile" value="profile" />
                <Tab label="About Us" value="about-us" />
                <Tab label="Publish" value="publish" />
                <Tab label="Explore" value="explore" />
              </Tabs>
            </Toolbar>
            <Grid item style={{ padding: "10px 0px" }}>
              {isAuthenticated ? (
                <Stack direction="column" spacing={1}>
                  <Typography variant="h6">
                    Welcome,{" "}
                    <Typography
                      component="span"
                      sx={{ fontWeight: 500, color: "primary.main" }}
                    >
                      {user ? user.nickname : ""}
                    </Typography>
                  </Typography>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", mr: 2 }}
                    >
                      {new Date().toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontStyle: "italic",
                        cursor: "pointer",
                        color: "primary.main",
                      }}
                      onClick={() => logout({ returnTo: window.location.origin })}
                    >
                      Log Out
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => loginWithRedirect()}
                  sx={{ mt: 2 }}
                >
                  Log In
                </Button>
              )}
            </Grid>
          </Grid>
          <Divider style={{ backgroundColor: "#FAA300", height: "12px" }} />
        </Box>
      )}
    </div>
  );
}
