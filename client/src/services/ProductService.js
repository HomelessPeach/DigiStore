import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const productAPI = createApi({
    reducerPath: 'productAPI',
    tagTypes: ['Product'],
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
    })
})