import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    authenticate: boolean;
    user: null,
    post: [],
}

const initialState: AuthState = {
    authenticate: false,
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

export const {
    setLogin,
    setLogout,
    setFriends,
    setPost,
    setPosts
} = authSlice.actions;
export default authSlice.reducer;