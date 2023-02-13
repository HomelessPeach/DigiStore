import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/auth`}),
    endpoints: (build) => ({
        login: build.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        }),
        refresh: build.query({
            query: () => ({
                url: '/refresh'
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            })
        }),
        tokensRefresh: build.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            })
        }),
    })
})