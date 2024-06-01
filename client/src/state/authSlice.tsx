import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    post: [],
}

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setLogin: (state, action) => { },
        setLogout: (state,action) => { },
        setFriends: (state, action) => { },
        setPost: (state,action) => {},
        setPosts: (state,action) => {},
    }
})