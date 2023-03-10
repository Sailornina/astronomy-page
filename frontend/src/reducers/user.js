import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    username: null,
    userId: null,
    accessToken: null,
    email: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },

    setError: (store, action) => {
      store.error = action.payload;
    },
    setLoading: (store, action) => {
      store.isLoading = action.payload;
    },
  },
});

export default user;
