// src/redux/slices/friendsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchPage: 1,
  searchLimit: 10,
  hasMore: true,
  searchedNewFriends: [],
  friendRequests: [],
  friends: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.searchPage = 1; 
      state.hasMore = true;
      state.searchedNewFriends = []; 
    },
    setSearchedNewFriends: (state, action) => {
      state.searchedNewFriends = action.payload.users;
      state.hasMore = action.payload.hasMore;
    },
    loadMoreFriends: (state, action) => {
      state.searchedNewFriends = [ ...action.payload.users];
      state.hasMore = action.payload.hasMore;
      state.searchPage += 1;
    },
    resetSearch: (state) => {
      state.searchQuery = "";
      state.searchPage = 1;
      state.hasMore = true;
      state.searchedNewFriends = [];
    },
  },
});

export const { 
  setSearchQuery, 
  setSearchedNewFriends, 
  loadMoreFriends,
  resetSearch 
} = friendsSlice.actions;
export default friendsSlice.reducer;