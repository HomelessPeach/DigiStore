import {createSlice} from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: JSON.parse(localStorage.getItem('user')) || {
            id: 1,
            email: '',
            name: '',
            phoneNumber: '',
            isAdmin: false,
            avatar: '',
        },
        tokens: JSON.parse(localStorage.getItem('tokens')) || {
            accessToken: '',
            refreshToken: '',
        },
        wishList: JSON.parse(localStorage.getItem('wishList')) || [],
        basket: JSON.parse(localStorage.getItem('basket')) || [],
    },
    reducers: {
        addToBasket(state, action) {
            const basket = state.basket.filter((item)=> item.id !== action.payload.id)
            if (basket.length === state.basket.length) {
                state.basket.push(action.payload)
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