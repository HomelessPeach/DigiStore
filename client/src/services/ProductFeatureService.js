import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, fetchBaseQueryWithRefresh} from "./index";
import {base64StringToFile} from "../utils";

export const productFeatureAPI = createApi({
    reducerPath: 'productFeatureAPI',
    tagTypes: ['ProductFeature'],
    baseQuery: fetchBaseQueryWithRefresh({
        baseUrl: `${apiUrl}/product_feature`
    }),
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
            providesTags: ['ProductFeature']
        }),
        productFeatureShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductFeature']
        }),
        productFeatureCreate: build.mutation({
            query: (data) => ({
                url: `/admin`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ProductFeature']
        }),
        productFeatureUpdate: build.mutation({
            query: (data) => ({
                url: `/admin/${data.product_feature_id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['ProductFeature']
        }),
        productFeatureDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'ProductFeature', id: 'LIST'}]
        }),
        getProductFeatureData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductFeature']
        }),
        getProductFeaturesData: build.mutation({
            query: () => ({
                url: `/admin`,
                method: 'GET',
                params: {
                    _sort: 'product_feature_name',
                    _order: 'ASC'
                }
            }),
            providesTags: ['ProductFeature']
        }),
    })
})