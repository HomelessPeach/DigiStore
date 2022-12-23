import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    tagTypes: ['User'],
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
            providesTags: ['User']
        }),
        userShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['User']
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
            invalidatesTags: ['User']
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
            invalidatesTags: ['User']
        }),
        userDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        getUserData: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['User']
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
            providesTags: ['User']
        }),
    })
})