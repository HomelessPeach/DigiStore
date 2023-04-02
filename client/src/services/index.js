import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const baseUrl = 'http://localhost:8081';
export const attributeFilesUrl = `${baseUrl}/attribute-files`
export const apiUrl = `${baseUrl}/api`;



export const fetchBaseQueryWithRefresh = (fetchBaseQueryArgs) => {
    const baseQuery = fetchBaseQuery(fetchBaseQueryArgs)
    const baseQueryRefresh = fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState()).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    })
    return async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result.error && result.error.status === 401) {
            const refreshResult = await baseQueryRefresh('/refresh', api, extraOptions);
            console.log(refreshResult);
            // api.dispatch(userActions.login(refreshResult.data.access))
            if (refreshResult.data) {
                result = await baseQuery(args, api, extraOptions);
            }
        }
        return result;
    }
}