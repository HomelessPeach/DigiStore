import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/product`}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({productCategoryId}) => ({
                url: `/`,
                method: 'GET',
                params: {
                    fk_product_category: productCategoryId
                }
            }),
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({product_id}) => ({type: 'Product', id: product_id})),
                        {type: 'Product', id: 'CARDS'}
                    ]
                    :
                    [{type: 'Product', id: 'CARDS'}]
            }
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'Product', id: data.product_id},
                        {type: 'Product', id: 'CARD'}
                    ]
                    :
                    [{type: 'Product', id: 'CARD'}]
            }
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
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({product_id}) => ({type: 'Product', id: product_id})),
                        {type: 'Product', id: 'LIST'}
                    ]
                    :
                    [{type: 'Product', id: 'LIST'}]
            }
        }),
        productShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'Product', id: data.product_id},
                        {type: 'Product', id: 'SHOW'}
                    ]
                    :
                    [{type: 'Product', id: 'SHOW'}]
            }
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
            invalidatesTags: [{type: 'Product', id: 'LIST'}]
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
            invalidatesTags: [{type: 'Product', id: 'LIST'}, {type: 'Product', id: 'SHOW'}]
        }),
        productDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Product', id: 'LIST'}]
        }),
        getProductData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
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
        // }),
    })
})