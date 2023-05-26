import {createSlice} from "@reduxjs/toolkit";
import {decodeToken} from "react-jwt";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: localStorage.getItem('accessToken')?
            (() => {
                const user = decodeToken(localStorage.getItem('accessToken'))
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
            const user = decodeToken(action.payload)
            state.data = {
                id: user.user_id,
                email: user.user_email,
                name: user.user_name,
                phoneNumber: user.user_phone_number,
                isAdmin: user.is_admin,
                avatar: user.image
            }
            if (action.payload) {
                localStorage.setItem('accessToken', action.payload);
            }
        },
        logout(state) {
            state.data = null;
            state.wishList = []
            state.basket = []
            localStorage.removeItem('accessToken');
            localStorage.removeItem('basket')
            localStorage.removeItem('wishList')
        },
        addToBasket(state, action) {
            state.basket.push(action.payload)
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        removeFromBasket(state, action) {
            const basket = state.basket.filter((item)=> item.id !== action.payload.id)
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
            state.wishList.push(action.payload)
            localStorage.setItem('wishList', JSON.stringify(state.wishList))
        },
        removeFromFavorite(state, action) {
            const favorite = state.wishList.filter((item)=> item.id !== action.payload.id)
            state.wishList = [...favorite]
            localStorage.setItem('wishList', JSON.stringify(state.wishList))
        },
        clearUserProductData(state) {
            state.wishList = []
            state.basket = []
            localStorage.setItem('basket', JSON.stringify(state.basket))
            localStorage.setItem('wishList', JSON.stringify(state.wishList))
        }
    }
})