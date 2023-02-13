import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authAPI} from "../services/AuthService";
import {chatAPI} from "../services/ChatService";
import {feedbackAPI} from "../services/FeedbackService";
import {newsAPI} from "../services/NewsService";
import {orderAPI} from "../services/OrderService";
import {productCategoryAPI} from "../services/ProductCategoryService";
import {productFeatureAPI} from "../services/ProductFeatureService";
import {productAPI} from "../services/ProductService";
import {userAPI} from "../services/UserService";
import {UserSlice} from "./reducers/UserSlice";
import {FormSlice} from "./reducers/FormSlice";

const rootReducer = combineReducers({
    [UserSlice.name]: UserSlice.reducer,
    [FormSlice.name]: FormSlice.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [feedbackAPI.reducerPath]: feedbackAPI.reducer,
    [newsAPI.reducerPath]: newsAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [productCategoryAPI.reducerPath]: productCategoryAPI.reducer,
    [productFeatureAPI.reducerPath]: productFeatureAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,

})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                authAPI.middleware,
                chatAPI.middleware,
                feedbackAPI.middleware,
                newsAPI.middleware,
                orderAPI.middleware,
                productCategoryAPI.middleware,
                productFeatureAPI.middleware,
                productAPI.middleware,
                userAPI.middleware,
            )
})

setupListeners(store.dispatch)