import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, setUserOnQueryFulfilled} from "./index";
import {UserSlice} from "../store/reducers/UserSlice";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
            baseUrl: `${apiUrl}/auth`
        }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: {
                    user_email: user.user_email,
                    user_password: user.user_password
                }
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    setUserOnQueryFulfilled(data, dispatch);
                } catch (error) {
                    if (error.error.status === 401) {
                        args?.unauthorizedHandler()
                    }
                }
            }
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
                dispatch(UserSlice.actions.logout());
            }
        }),
    })
})