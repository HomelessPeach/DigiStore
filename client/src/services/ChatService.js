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
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({chat_id}) => ({type: 'Chat', id: chat_id})),
                        {type: 'Chat', id: 'LIST'}
                    ]
                    :
                    [{type: 'Chat', id: 'LIST'}]
            }
        }),
        chatShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'Chat', id: data.chat_id},
                        {type: 'Chat', id: 'SHOW'}
                    ]
                    :
                    [{type: 'Chat', id: 'SHOW'}]
            }
        }),
        messageCreate: build.mutation({
            query: (body) => ({
                url: `/message`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: [{type: 'Chat', id: 'SHOW'}]
        }),
    })
})