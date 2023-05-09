import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl, fetchBaseQueryWithRefresh} from "./index";
import {base64StringToFile} from "../utils";

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    tagTypes: ['News'],
    baseQuery: fetchBaseQueryWithRefresh({
        baseUrl: `${apiUrl}/news`
    }),
    endpoints: (build) => ({
        getAllNews: build.query({
            query: () => ({
                url: `/`,
                method: 'GET',
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ['News']
        }),
        getNews: build.query({
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
            providesTags: ['News']
        }),
        newsList: build.query({
            query: ({offset = 0, limit = 10, sort = '', News = 'ASC'}) => ({
                url: `/admin`,
                method: 'GET',
                params: {
                    _offset: offset,
                    _limit: limit,
                    _sort: sort,
                    _order: News
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
            providesTags: ['News']
        }),
        newsShow: build.query({
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
            providesTags: ['News']
        }),
        newsCreate: build.mutation({
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
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['News']
        }),
        newsUpdate: build.mutation({
            query: (data) => ({
                url: `/admin/${data.news_id}`,
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
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['News']
        }),
        newsDelete: build.mutation({
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
            invalidatesTags: ['News']
        }),
    })
})