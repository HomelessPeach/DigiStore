import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    tagTypes: ['UserChangePasswordForm'],
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
                        ...data.map(({user_id}) => ({type: 'UserChangePasswordForm', id: user_id})),
                        {type: 'UserChangePasswordForm', id: 'LIST'}
                    ]
                    :
                    [{type: 'UserChangePasswordForm', id: 'LIST'}]
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
                        {type: 'UserChangePasswordForm', id: data.user_id},
                        {type: 'UserChangePasswordForm', id: 'SHOW'}
                    ]
                    :
                    [{type: 'UserChangePasswordForm', id: 'SHOW'}]
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
            invalidatesTags: [{type: 'UserChangePasswordForm', id: 'LIST'}]
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
            invalidatesTags: [{type: 'UserChangePasswordForm', id: 'LIST'}, {type: 'UserChangePasswordForm', id: 'SHOW'}]
        }),
        userDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'UserChangePasswordForm', id: 'LIST'}]
        }),
        getUserData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
        }),
        getUsersData: build.mutation({
            query: () => ({
                url: `/admin`,
                method: 'GET',
                params: {
                    _sort: 'user_name',
                    _order: 'ASC'
                }
            }),
        }),
    })
})