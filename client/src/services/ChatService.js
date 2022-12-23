import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    tagTypes: ['Chat'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/chat`}),
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
    })
})