import {createSlice} from "@reduxjs/toolkit";

const initialState=true;
const healthSlice=createSlice({
    name:"health",
    initialState,
    reducers:{
        down(){
            return false;
        },
        up(){
            return true;
        }
    }
})
export const {down,up}=healthSlice.actions;
export default healthSlice.reducer;
