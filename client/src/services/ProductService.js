import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/product`}),
    endpoints: (build) => ({
        getProductForCarousel: build.query({
            query: () => ({
                url: `/carousel`,
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        getProducts: build.query({
            query: ({productCategoryId}) => ({
                url: `/`,
                method: 'GET',
                params: {
                    fk_product_category: productCategoryId
                }
            }),
            providesTags: ['Product']
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
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
            },
            providesTags: ['Product']
        }),
        productShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        productCreate: build.mutation({
            query: (data) => ({
                url: `/admin`,
                method: 'POST',
                body: ((data) => {
                    const formData = new FormData();
                    if (data?.product_images) {
                        const images = []
                        for (let image of data?.product_images) {
                            if (image.product_image_id) {
                                images.push(image)
                                continue
                            }
                            if (image.is_delete) {
                                continue
                            }
                            if (image.is_preview) {
                                formData.append('previewSourceImage', base64StringToFile(data.image.new_image, `image`));
                                continue
                            }
                            formData.append('sourceImage', base64StringToFile(data.image.new_image, `image`));
                        }
                        data.product_images = images
                    }
                    const productFeatureValues = []
                    for (let item of data.product_feature_values) {
                        if (item.fk_product_feature && item.product_features_values_value) {
                            productFeatureValues.push(item)
                        }
                    }
                    data.product_feature_values = productFeatureValues
                    formData.append('data', JSON.stringify(data));
                    return formData
                })(data),
            }),
            invalidatesTags: ['Product']
        }),
        productUpdate: build.mutation({
            query: (data) => ({
                url: `/admin/${data.product_id}`,
                method: 'PUT',
                body: ((data) => {
                    const formData = new FormData();
                    if (data?.product_images) {
                        const images = []
                        for (let image of data?.product_images) {
                            if (image.product_image_id) {
                                images.push(image)
                                continue
                            }
                            if (image.is_delete) {
                                continue
                            }
                            if (image.is_preview) {
                                formData.append('previewSourceImage', base64StringToFile(data.image.new_image, `image`));
                                continue
                            }
                            formData.append('sourceImage', base64StringToFile(data.image.new_image, `image`));
                        }
                        data.product_images = images
                    }
                    const productFeatureValues = []
                    for (let item of data.product_feature_values) {
                        if (item.fk_product_feature && item.product_features_values_value) {
                            productFeatureValues.push(item)
                        }
                    }
                    data.product_feature_values = productFeatureValues
                    formData.append('data', JSON.stringify(data));
                    return formData
                })(data),
            }),
            invalidatesTags: ['Product']
        }),
        productDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        getProductData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        // getProductData: build.mutation({
        //     query: () => ({
        //         url: `/admin`,
        //         method: 'GET',
        //         params: {
        //             _sort: 'product_name',
        //             _order: 'ASC'
        //         }
        //     }),
        //     providesTags: ['Product']
        // }),
    })
})