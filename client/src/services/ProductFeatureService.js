import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const productFeatureAPI = createApi({
    reducerPath: 'productFeatureAPI',
    tagTypes: ['ProductFeature'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/product_feature`}),
    endpoints: (build) => ({
        productFeatureList: build.query({
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
                        ...data.map(({product_feature_id}) => ({type: 'ProductFeature', id: product_feature_id})),
                        {type: 'ProductFeature', id: 'LIST'}
                    ]
                    :
                    [{type: 'ProductFeature', id: 'LIST'}]
            }
        }),
        productFeatureShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'ProductFeature', id: data.product_feature_id},
                        {type: 'ProductFeature', id: 'SHOW'}
                    ]
                    :
                    [{type: 'ProductFeature', id: 'SHOW'}]
            }
        }),
        productFeatureCreate: build.mutation({
            query: (data) => ({
                url: `/admin`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'ProductFeature', id: 'LIST'}]
        }),
        productFeatureUpdate: build.mutation({
            query: (data) => ({
                url: `/admin/${data.product_feature_id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [{type: 'ProductFeature', id: 'LIST'}, {type: 'ProductFeature', id: 'SHOW'}]
        }),
        productFeatureDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'ProductFeature', id: 'LIST'}]
        }),
    })
})