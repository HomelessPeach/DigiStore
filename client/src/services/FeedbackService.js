import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const feedbackAPI = createApi({
    reducerPath: 'feedbackAPI',
    tagTypes: ['Feedbacks'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/feedback`}),
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
            transformResponse(apiResponse, meta) {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({feedback_id}) => ({type: 'Users', id: feedback_id})),
                        {type: 'Feedbacks', id: 'LIST'}
                    ]
                    :
                    [{type: 'Feedbacks', id: 'LIST'}]
            }
        }),
        feedbackShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'Feedbacks', id: data.feedback_id},
                        {type: 'Feedbacks', id: 'SHOW'}
                    ]
                    :
                    [{type: 'Feedbacks', id: 'SHOW'}]
            }
        }),
        feedbackMarkAsAnswered: build.mutation({
            query: (id) => ({
                url: `/answered/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Feedbacks', id: 'LIST'}, {type: 'Feedbacks', id: 'SHOW'}]
        })
    })
})