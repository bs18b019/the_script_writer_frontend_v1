// types
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userGl: 'User',
  userIDGl: '',
  mainContent: '',
  contentTitle: '',
  tabValue: '',
  uid: '',
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setUserGl(state, action) {
      state.userGl = action.payload.userGl;
    },

    setUserIDGl(state, action) {
      state.userIDGl = action.payload.userIDGl;
    },

    setMainContent(state,action) {
      state.mainContent = action.payload.mainContent;
    },

    setContentTitle(state,action) {
      state.contentTitle = action.payload.contentTitle;
    },

    setTabValue(state,action) {
      state.tabValue = action.payload.tabValue;
    },

    setUid(state,action) {
      state.uid = action.payload.uid;
    },
    
  }
});

export default menu.reducer;

export const {
  setUserGl,
  setUserIDGl,
  setMainContent,
  setContentTitle,
  setTabValue,
  setUid,
} = menu.actions;
