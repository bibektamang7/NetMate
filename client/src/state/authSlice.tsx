import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the state
export interface User {
    followers: [];
    following: [];
    username: string;
    fullName: string;
    bio: string;
    coverImage: string;
    profileImage: string;
    isFollowed?: boolean;
}

export interface Post {
    _id: string;
    content: string;
    author: User;
    visibility: string;
    postImage: string;
    // Add any other post properties here
}

interface AuthState {
    authenticate: boolean;
    user: User | null;
    post: Post[];
}

// Initial state
const initialState: AuthState = {
    authenticate: false,
    user: null,
    post: [],
}

// Define the slice
export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{ data: User }>) => {
            state.user = action.payload.data;
            state.authenticate = true;
        },
        setLogout: (state) => {
            state.user = null;
            state.authenticate = false;
            state.post = [];
        },
        setUser: (state, action:PayloadAction<{data:User}>) => {
            console.log("change");
            
            state.user = action.payload.data;
            console.log(state.user);
            
        },
        // setFriends: (state, action: PayloadAction<{ friends: User[] }>) => {
        //     if (state.user) {
        //         state.user[followers] = action.payload.friends;
        //     }
        // },
        setPost: (state, action: PayloadAction<Post>) => {
            state.post.push(action.payload);
        },
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.post = action.payload;
        },
    }
})

// Export the actions and reducer
export const {
    setLogin,
    setLogout,
    setUser,
    // setFriends,
    setPost,
    setPosts
} = authSlice.actions;

export default authSlice.reducer;
