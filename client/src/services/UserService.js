import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/user`}),
    endpoints: (build) => ({
        userList: build.query({
            query: ({offset = 0, limit = 10, sort = '', order = 'ASC'}) => ({
                url: `/list?_offset=${offset}&_limit=${limit}&_sort=${sort}&_order=${order}`,
                method: 'GET',
            }),
            transformResponse(apiResponse, meta) {
                return {data: apiResponse.map((item) => {
                        return {...item, image: item.image?.image_path}
                    }), totalCount: meta.response.headers.get('X-Total-Count')}
            }
        }),
        userShow: build.query({
            query: (id) => ({
                url: `/show/${id}`,
                method: 'GET',
            })
        })
    })
})