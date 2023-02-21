import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/order`}),
    endpoints: (build) => ({
        addOrder: build.mutation({
            query: (data) => ({
                url: `/add`,
                method: 'POST',
                body: data
            })
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
            transformResponse(apiResponse, meta) {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ['Order']
        }),
        orderShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order']
        }),
        orderCancel: build.mutation({
            query: (id) => ({
                url: `/cancel/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order']
        }),
        orderComplete: build.mutation({
            query: (id) => ({
                url: `/complete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order']
        })
    })
})