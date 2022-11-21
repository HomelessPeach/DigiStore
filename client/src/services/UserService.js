import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiAdminUrl} from "./index";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiAdminUrl}/user`}),
    endpoints: (build) => ({
        userList: build.query({
            query: ({offset = 0, limit = 10, sort = '', order = 'ASC'}) => ({
                url: `?_offset=${offset}&_limit=${limit}&_sort=${sort}&_order=${order}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            }
        }),
        userShow: build.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            })
        })
    })
})