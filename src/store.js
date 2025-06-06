import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import heatlhReducer from "./reducers/heatlhReducer.js";

const store= configureStore({
    reducer:{
        user:userReducer,
        health:heatlhReducer,
    }
})
export default store