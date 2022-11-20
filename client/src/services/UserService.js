import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiAdminUrl} from "./index";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${apiAdminUrl}/user`}),
    endpoints: (build) => ({
        userList: build.query({
            query: () => ({
                url: '/',
            })
        })
    })
})