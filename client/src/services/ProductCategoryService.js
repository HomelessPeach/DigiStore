import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const productCategoryAPI = createApi({
    reducerPath: 'productCategoryAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/product_category`}),
    endpoints: (build) => ({
        productCategoryList: build.query({
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
        productCategoryShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            })
        })
    })
})