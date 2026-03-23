import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './slice/themeSlice'
import { baseApi } from './api/baseApi';
import authReducer from "./slice/authSlice"
import cartReducer from "./slice/cartSlice"



const reduxStore = configureStore({
    reducer: {
        // reducer for website theme toggle
        theme: themeReducer,
        // reducer for API get menu items
        [baseApi.reducerPath]: baseApi.reducer,
        //reducer for AUTH
        auth: authReducer,
        //reducer for Cart
        cart: cartReducer,
        //OrdersModal
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(baseApi.middleware)
})

export default reduxStore;