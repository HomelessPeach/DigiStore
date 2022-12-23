import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const productCategoryAPI = createApi({
    reducerPath: 'productCategoryAPI',
    tagTypes: ['ProductCategory'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/product_category`}),
    endpoints: (build) => ({
        getProductCategories: build.query({
            query: () => ({
                url: `/`,
                method: 'GET',
            }),
            providesTags: ['ProductCategory']
        }),
        getProductCategoryName: build.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductCategory']
        }),
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
            },
            providesTags: ['ProductCategory']
        }),
        productCategoryShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductCategory']
        }),
        productCategoryCreate: build.mutation({
            query: (data) => ({
                url: `/admin`,
                method: 'POST',
                body: ((data) => {
                    const formData = new FormData();
                    if (data?.image?.new_image) {
                        formData.append('sourceImage', base64StringToFile(data.image.new_image, `image`));
                        delete data.image.new_image
                    }
                    formData.append('data', JSON.stringify(data));
                    return formData
                })(data),
            }),
            invalidatesTags: ['ProductCategory']
        }),
        productCategoryUpdate: build.mutation({
            query: (data) => ({
                url: `/admin/${data.product_category_id}`,
                method: 'PUT',
                body: ((data) => {
                    const formData = new FormData();
                    if (data?.image?.new_image) {
                        formData.append('sourceImage', base64StringToFile(data.image.new_image, `image`));
                        delete data.image.new_image
                    }
                    formData.append('data', JSON.stringify(data));
                    return formData
                })(data),
            }),
            invalidatesTags: ['ProductCategory']
        }),
        productCategoryDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductCategory']
        }),
        getProductCategoryData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductCategory']
        }),
        getProductCategoriesData: build.mutation({
            query: () => ({
                url: `/admin`,
                method: 'GET',
                params: {
                    _sort: 'product_category_name',
                    _order: 'ASC'
                }
            }),
            providesTags: ['ProductCategory']
        }),
    })
})