import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/product`}),
    endpoints: (build) => ({
        productList: build.query({
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
            }
        }),
        productShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            })
        })
    })
})