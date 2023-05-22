import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, fetchBaseQueryWithRefresh} from "./index";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQueryWithRefresh({
        baseUrl: `${apiUrl}/order`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (build) => ({
        addOrder: build.mutation({
            query: (data) => ({
                url: `/add`,
                method: 'POST',
                body: data
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        orderList: build.query({
            query: ({offset = 0, limit = 10, sort = '', order = 'ASC'}) => ({
                url: `/admin`,
                method: 'GET',
                params: {
                    _offset: offset,
                    _limit: limit,
                    _sort: sort,
                    _order: order
                }
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            transformResponse: (apiResponse, meta) => {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ['Order']
        }),
        orderShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Order']
        }),
        orderCancel: build.mutation({
            query: (id) => ({
                url: `/cancel/${id}`,
                method: 'PUT',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Order']
        }),
        orderComplete: build.mutation({
            query: (id) => ({
                url: `/complete/${id}`,
                method: 'PUT',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Order']
        }),
        getUserOrder: build.query({
            query: (id) => ({
                url: `/user-order/${id}`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Order']
        }),
    })
})