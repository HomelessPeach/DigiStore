import {createSlice} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: localStorage.getItem('accessToken')?
            (() => {
                const user = jwtDecode(localStorage.getItem('accessToken'))
                return {
                    id: user.user_id,
                    email: user.user_email,
                    name: user.user_name,
                    phoneNumber: user.user_phone_number,
                    isAdmin: user.is_admin,
                    avatar: user.image
                }
            })()
            : null,
        wishList: JSON.parse(localStorage.getItem('wishList')) || [],
        basket: JSON.parse(localStorage.getItem('basket')) || [],
    },
    reducers: {
        login(state, action) {
            const user = jwtDecode(action.payload)
            state.data = {
                id: user.user_id,
                email: user.user_email,
                name: user.user_name,
                phoneNumber: user.user_phone_number,
                isAdmin: user.is_admin,
                avatar: user.image
            }
            if (!action.payload)
                localStorage.setItem('accessToken', action.payload);
        },
        logout(state) {
            localStorage.removeItem('accessToken');
            state.data = null;
        },
        addToBasket(state, action) {
            const basket = state.basket.filter((item)=> item.id !== action.payload.id)
            if (basket.length === state.basket.length) {
                state.basket.push(action.payload)
                localStorage.setItem('basket', JSON.stringify(state.basket))
                return;
            }
            state.basket = [...basket]
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        setCountInBasket(state, action) {
            for (let i = 0; i < state.basket.length; i++) {
                if (state.basket[i].id !== action.payload.id) {
                    continue
                }
                if (action.payload.count === 0) {
                    state.basket = state.basket.filter((item)=> item.id !== action.payload.id)
                    break
                }
                state.basket[i] = {...state.basket[i], count: action.payload.count}
            }
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        addToFavorite(state, action) {
            const wishList = state.wishList.filter((item)=> item.id !== action.payload.id)
            if (wishList.length === state.wishList.length) {
                state.wishList.push(action.payload)
                localStorage.setItem('wishList', JSON.stringify(state.wishList))
                return;
            }
            state.wishList = [...wishList]
            localStorage.setItem('wishList', JSON.stringify(state.wishList))
        },
    }
})