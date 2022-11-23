import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/order`}),
    endpoints: (build) => ({
        orderList: build.query({
            query: ({offset = 0, limit = 10, sort = '', order = 'ASC'}) => ({
                url: `/list?_offset=${offset}&_limit=${limit}&_sort=${sort}&_order=${order}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            }
        }),
        orderShow: build.query({
            query: (id) => ({
                url: `/show/${id}`,
                method: 'GET',
            })
        })
    })
})