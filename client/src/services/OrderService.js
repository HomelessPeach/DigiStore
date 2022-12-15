import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/order`}),
    endpoints: (build) => ({
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
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({order_id}) => ({type: 'Order', id: order_id})),
                        {type: 'Order', id: 'LIST'}
                    ]
                    :
                    [{type: 'Order', id: 'LIST'}]
            }
        }),
        orderShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'Order', id: data.order_id},
                        {type: 'Order', id: 'SHOW'}
                    ]
                    :
                    [{type: 'Order', id: 'SHOW'}]
            }
        })
    })
})