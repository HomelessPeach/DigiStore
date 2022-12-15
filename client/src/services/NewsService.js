import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiUrl} from "./index";
import {base64StringToFile} from "../utils";

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    tagTypes: ['News'],
    baseQuery: fetchBaseQuery({baseUrl: `${apiUrl}/news`}),
    endpoints: (build) => ({
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
            transformResponse(apiResponse, meta) {
                return {data: apiResponse, totalCount: meta.response.headers.get('X-Total-Count')}
            },
            providesTags: ({data}) => {
                return (data)?
                    [
                        ...data.map(({news_id}) => ({type: 'News', id: news_id})),
                        {type: 'News', id: 'LIST'}
                    ]
                    :
                    [{type: 'News', id: 'LIST'}]
            }
        }),
        newsShow: build.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'GET',
            }),
            providesTags: (data) => {
                return (data)?
                    [
                        {type: 'News', id: data.news_id},
                        {type: 'News', id: 'SHOW'}
                    ]
                    :
                    [{type: 'News', id: 'SHOW'}]
            }
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
            invalidatesTags: [{type: 'News', id: 'LIST'}]
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
            invalidatesTags: [{type: 'News', id: 'LIST'}, {type: 'News', id: 'SHOW'}]
        }),
        newsDelete: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'News', id: 'LIST'}]
        }),
    })
})