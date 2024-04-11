import { configureStore } from "@reduxjs/toolkit";

import { booksReducer } from "./reducers/booksReducer";



export const store = configureStore({
    reducer:{
        booksReducer,
    }
})
