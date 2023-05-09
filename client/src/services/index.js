import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserSlice} from "../store/reducers/UserSlice";

export const baseUrl = 'http://localhost:8081';
export const attributeFilesUrl = `${baseUrl}/attribute-files`
export const apiUrl = `${baseUrl}/api`;



export const fetchBaseQueryWithRefresh = (fetchBaseQueryArgs) => {
    const baseQuery = fetchBaseQuery(fetchBaseQueryArgs)
    const baseQueryRefresh = fetchBaseQuery({baseUrl: apiUrl})
    return async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result.error && result.error.status === 401) {
            const refreshResult = await baseQueryRefresh('/refresh', api, extraOptions);
            if (refreshResult.data) {
                setUserOnQueryFulfilled({ data: refreshResult.data }, api.dispatch);
                result = await baseQuery(args, api, extraOptions);
            } else {
                await baseQueryRefresh('/sign-out', api, extraOptions);
                api.dispatch(UserSlice.actions.logout());
            }
        }
        return result;
    }
}

export const setUserOnQueryFulfilled = (data, dispatch) => {
    dispatch(UserSlice.actions.login(data.accessToken));
};