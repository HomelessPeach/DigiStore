import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/user`}),
    endpoints: (build) => ({
        userList: build.query({
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
                return {data: apiResponse.map((item) => {
                        return {...item, image: item.image?.image_path}
                    }), totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({user_id}) => ({type: 'Users', id: user_id})),
                        {type: 'Users', id: 'LIST'}
                    ]
                    :
                    [{type: 'Users', id: 'LIST'}]
            }
        }),
        userShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'Users', id: data.user_id},
                        {type: 'Users', id: 'SHOW'}
                    ]
                    :
                    [{type: 'Users', id: 'SHOW'}]
            }
        }),
        userCreate: build.mutation({
            query: (data) => ({
                url: `/admin`,
                method: 'POST',
                body: ((data) => {
                    const formData = new FormData();
                    if (data?.image?.new_image) {
                        formData.append('sourceImage', base64StringToFile(data.image.new_image, `avatar`));
                        delete data.image.new_image
                    }
                    formData.append('data', JSON.stringify(data));
                    return formData
                })(data),
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
        userUpdate: build.mutation({
            query: (data) => ({
                url: `/admin/${data.user_id}`,
                method: 'PUT',
                body: ((data) => {
                    const formData = new FormData();
                    if (data?.image?.new_image) {
                        formData.append('sourceImage', base64StringToFile(data.image.new_image, `avatar`));
                        delete data.image.new_image
                    }
                    formData.append('data', JSON.stringify(data));
                    return formData
                })(data),
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}, {type: 'Users', id: 'SHOW'}]
        }),
        userDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
        getUserData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
        }),
    })
})