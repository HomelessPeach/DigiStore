import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    apiUrl,
    setUserOnQueryFulfilled,
    setUserProductDataClearOnQueryFulfilled,
    setUserProductDataOnQueryFulfilled
} from "./index";
import {UserSlice} from "../store/reducers/UserSlice";
import {userAPI} from "./UserService";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
            baseUrl: `${apiUrl}/auth`
        }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: {
                    user_email: user.user_email,
                    password: user.password
                }
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled, getState }) => {
                try {
                    const { data } = await queryFulfilled;
                    setUserOnQueryFulfilled(data, dispatch);
                    const {data: user, basket} = getState().user
                    if (user?.id) {
                        if (basket?.length) {
                            for (let product of basket) {
                                await dispatch(userAPI.endpoints.setUserFavoriteProduct.initiate({fk_product: product.id, fk_user: user.id, is_basket: true, basket_count: product.count}))
                            }
                        }
                        setUserProductDataClearOnQueryFulfilled(dispatch)
                        const product = await dispatch(userAPI.endpoints.getUserProducts.initiate(user.id))
                        if (product?.data) {
                            setUserProductDataOnQueryFulfilled(product.data, dispatch)
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: build.mutation({
            query: () => ({
                url: '/refresh',
                method: 'PUT'
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const {data} = await queryFulfilled;
                    setUserOnQueryFulfilled(data, dispatch);
                } catch (error) {
                    dispatch(UserSlice.actions.logout());
                }
            }
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
                dispatch(UserSlice.actions.logout());
            }
        }),
        registration: build.mutation({
            query: (user) => ({
                url: '/registration',
                method: 'POST',
                body: user
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    setUserOnQueryFulfilled(data, dispatch);
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        sendResetPassword: build.mutation({
            query: (data) => ({
                url: '/reset-password',
                method: 'POST',
                body: data
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        resetPassword: build.mutation({
            query: ({data, token}) => ({
                url: `/reset-password/${token}`,
                method: 'PUT',
                body: data
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    })
})