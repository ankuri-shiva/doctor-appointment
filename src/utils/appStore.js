import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './doctorSlice';

const store = configureStore({
    reducer : {
        doctor : doctorReducer,
        //appointment : appointmentReducer
    }
});

export default store;