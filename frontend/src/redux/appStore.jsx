import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import mailReducer from './mailSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        mail: mailReducer,
    }
})

export default appStore;