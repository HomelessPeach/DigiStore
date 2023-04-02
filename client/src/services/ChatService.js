import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, fetchBaseQueryWithRefresh} from "./index";

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    tagTypes: ['Chat'],
    baseQuery: fetchBaseQueryWithRefresh({
        baseUrl: `${apiUrl}/chat`
    }),
    endpoints: (build) => ({
        chatList: build.query({
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
            transformResponse(apiResponse, meta) {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ['Chat']
        }),
        chatShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['Chat']
        }),
        messageCreate: build.mutation({
            query: (body) => ({
                url: `/message`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Chat']
        }),
        getUserChat: build.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
            providesTags: ['Chat']
        }),
        createChat: build.mutation({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Chat']
        }),
    })
})