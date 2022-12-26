import {createSlice} from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            id: 1,
            email: 'q',
            name: '',
            phoneNumber: '',
            isAdmin: false,
            avatar: '',
        },
        tokens: {
            accessToken: '',
            refreshToken: '',
        },
        wishList: [],
        basket: [],
    },
    reducers: {
        addToBasket(state, action) {
            const basket = state.basket.filter((item)=> item.id !== action.payload.id)
            if (basket.length === state.basket.length) {
                state.basket.push(action.payload)
                return;
            }
            state.basket = [...basket]
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
        },
        addToFavorite(state, action) {
            const wishList = state.wishList.filter((item)=> item.id !== action.payload.id)
            if (wishList.length === state.wishList.length) {
                state.wishList.push(action.payload)
                return;
            }
            state.wishList = [...wishList]
        },
    }
})