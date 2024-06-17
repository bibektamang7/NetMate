import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../state/authSlice";

export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "api",
    tagTypes: [
        "User",
        "Friends",
        "Post",
    ],
    endpoints: (build) => ({
        validateToken: build.query({
            query: () => ({
                url: '/users/validateToken',
                method: 'GET',
                credentials: "include",
            }),
            providesTags: ["User"],
        }),
        registerUser: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                url: "/users/createUser",
            }),
            invalidatesTags: ["User"]
        }),
        login: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                url: "/users/login",
                credentials: "include",
            }),
            invalidatesTags: ["User"]
        }),
        logout: build.mutation({
            query: () => ("/users/logout"),
            invalidatesTags: ["User"]
        }),



        searchUser: build.query({
            query: (params: string) => ({
                credentials: "include",
                url: `/users/searchUser?query=${params}`,
            }),
            providesTags: ["User"]
        }),

        updateCoverImage: build.mutation({
            query: (data: FormData) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "/users/updateCoverImage"
            }),
            invalidatesTags: ["User"]
        }),
        updateProfileImage: build.mutation({
            query: (data: FormData) => ({
                method: "POST",
                body: data,
                credentials: "include",
                url: "/users/updateProfileImage"
            }),
            invalidatesTags: ["User"]
        }),
        updateProfile: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                url: "/users/updateProfile"
            }),
            invalidatesTags: ["User"]
        }),
        //Followers and Followings
        followUser: build.mutation({
            query: (username) => ({
                method: "POST",
                credentials: "include",
                url: `/users/follow/${username}`,
            }),
            invalidatesTags: ["Friends"],
        }),
        unFollowUser: build.mutation({
            query: (username) => ({
                method: "POST",
                credentials: "include",
                url: `/users/unfollow/${username}`,
            }),
            invalidatesTags: ["Friends"]
        }),
        getFollowers: build.query({
            query: () => ({
                credentials: "include",
                url: "/users/followers",
            }),
            providesTags: ["Friends"]
        }),
        getFollowing: build.query({
            query: () => ({
                credentials: "include",
                url:"/users/following"
            }),
            providesTags: ["Friends"]
        }),
        getSuggestedUsers: build.query({
            query: () => ({
                credentials: "include",
                url: "/users/suggestedUser"
            }),
            providesTags: ["Friends"]
        }),

        // posts
        createPost: build.mutation({
            query: (data) => ({
                body: data,
                method: "POST",
                credentials: "include",
                url: "/posts/createPost"
            }),
            invalidatesTags: ["Post"]
        }),
        getPosts: build.query({
            query: () => ({
                url:"/posts/getPosts",
                credentials: "include",
            }),
        })
    })
});

export const {
    useValidateTokenQuery,
    useRegisterUserMutation,
    useLoginMutation,
    
    useLogoutMutation,
    usePrefetch,

    useSearchUserQuery,
    useUpdateCoverImageMutation,
    useUpdateProfileImageMutation,
    useUpdateProfileMutation,
    
    //Friends
    useFollowUserMutation,
    useUnFollowUserMutation,
    useGetFollowersQuery,
    useGetSuggestedUsersQuery,
    useGetFollowingQuery,
    
    // posts
    useCreatePostMutation,
    useGetPostsQuery,
    
} = userApi;

