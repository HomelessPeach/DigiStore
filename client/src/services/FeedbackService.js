import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, fetchBaseQueryWithRefresh} from "./index";

export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    tagTypes: ['Feedbacks'],
    baseQuery: fetchBaseQueryWithRefresh({
        baseUrl: `${apiUrl}/feedback`
    }),
    endpoints: (build) => ({
        feedbackList: build.query({
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
            transformResponse: (apiResponse, meta) =>{
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ['Feedbacks']
        }),
        feedbackShow: build.query({
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
            providesTags: ['Feedbacks']
        }),
        feedbackMarkAsAnswered: build.mutation({
            query: (id) => ({
                url: `/answered/${id}`,
                method: 'PUT',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Feedbacks']
        }),
        feedbackCreate: build.mutation({
            query: (data) => ({
                url: `/create`,
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
            invalidatesTags: ['Feedbacks']
        }),
    })
})