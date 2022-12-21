import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const productCategoryAPI = createApi({
    reducerPath: 'productCategoryAPI',
    tagTypes: ['ProductCategory'],
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
            },
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({product_category_id}) => ({type: 'ProductCategory', id: product_category_id})),
                        {type: 'ProductCategory', id: 'LIST'}
                    ]
                    :
                    [{type: 'ProductCategory', id: 'LIST'}]
            }
        }),
        productCategoryShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'ProductCategory', id: data.product_category_id},
                        {type: 'ProductCategory', id: 'SHOW'}
                    ]
                    :
                    [{type: 'ProductCategory', id: 'SHOW'}]
            }
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
            invalidatesTags: [{type: 'ProductCategory', id: 'LIST'}]
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
            invalidatesTags: [{type: 'ProductCategory', id: 'LIST'}, {type: 'ProductCategory', id: 'SHOW'}]
        }),
        productCategoryDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'ProductCategory', id: 'LIST'}]
        }),
        getProductCategoryData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
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
        }),
    })
})