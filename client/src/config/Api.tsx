import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "api",
    tagTypes: [
        "User",
    ],
    endpoints: (build) => ({
        validateToken: build.query({
            query: () => ({
                url: '/users/validate-token',
                method: 'GET',
              }),
        }),
        registerUser: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                url: "/users/createUser",
            }),
        }),
        login: build.mutation({
            query: (data) => ({
                method: "POST",
                body: data,
                url: "/users/login",
            }),
        }),
        logout: build.mutation({
            query: () => ("/users/logout"),

        }),
    })
});

export const {
    useValidateTokenQuery,
    useRegisterUserMutation,
    useLoginMutation,
    
    useLogoutMutation,
    usePrefetch
} = userApi;

