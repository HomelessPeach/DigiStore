import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, fetchBaseQueryWithRefresh} from "./index";
import {base64StringToFile} from "../utils";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQueryWithRefresh({
        baseUrl: `${apiUrl}/product`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (build) => ({
        getProductForCarousel: build.query({
            query: () => ({
                url: `/carousel`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
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
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Product']
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Product']
        }),
        getProductReview: build.query({
            query: ({id, userId}) => ({
                url: `/${id}/review/${userId}`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Product']
        }),
        getProductReviews: build.query({
            query: ({id, offset, limit}) => ({
                url: `/${id}/review`,
                method: 'GET',
                params: {
                    _offset: offset,
                    _limit: limit,
                }
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Product']
        }),
        createProductReview: build.mutation({
            query: (data) => ({
               url: `/${data.fk_product}/review`,
               method: 'POST',
               body: data
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Product']
        }),
        updateProductReview: build.mutation({
            query: (data) => ({
                url: `/${data.fk_product}/review/${data.review_id}`,
                method: 'PUT',
                body: data
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Product']
        }),
        deleteProductReview: build.mutation({
            query: ({productId, reviewId}) => ({
                url: `/${productId}/review/${reviewId}`,
                method: 'DELETE',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Product']
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
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            transformResponse: (apiResponse, meta) => {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ['Product']
        }),
        productShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
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
                                formData.append('previewSourceImage', base64StringToFile(image.image_path, `image`));
                                continue
                            }
                            formData.append('sourceImage', base64StringToFile(image.image_path, `image`));
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
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
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
                                formData.append('previewSourceImage', base64StringToFile(image.image_path, `image`));
                                continue
                            }
                            formData.append('sourceImage', base64StringToFile(image.image_path, `image`));
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
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Product']
        }),
        productDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['Product']
        }),
        getProductData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['Product']
        }),
        getProductsById: build.mutation({
            query: (productIds) => ({
                url: `/products-by-id`,
                method: 'GET',
                params: {
                    productIds
                }
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
        })
    })
})