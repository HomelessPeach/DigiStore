import {createSlice} from "@reduxjs/toolkit";

export const FormSlice = createSlice({
    name: 'form',
    initialState: {
        loginForm: false
    },
    reducers: {
        setLoginForm(state, action) {
            state.loginForm = action.payload
        }
    }
})