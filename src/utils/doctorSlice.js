import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: "doctor",
    initialState : null,
    reducers : {
        addDoctor : (state, action) => {
            return action.payload;
        }
    }
});

export const {addDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;