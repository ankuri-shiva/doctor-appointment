import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './doctorSlice';
import  userReducer  from './userSlice';

const store = configureStore({
    reducer : {
        doctor : doctorReducer,
        user : userReducer,
    }
});

export default store;