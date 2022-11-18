import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {userAPI} from "../services/UserService";

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                userAPI.middleware
            )
})