import { configureStore, createSlice } from "@reduxjs/toolkit";


const redux = require ("redux");

const pagemanager=createSlice({
    name:"pm",
    initialState:{page:"Home"},
    reducers:{
        home(state){state.page="Home"},
        additem(state){state.page="AI"},
        addEitem(state){state.page="MI"},
        removeitem(state){state.page="RI"},
        makebill(state){state.page="MB"},
        viewbill(state){state.page="VB"},
        viewstocks(state){state.page="VS"}
    }
})

const Store=configureStore({
    reducer:pagemanager.reducer
})

export const pageaction=pagemanager.actions;
export default Store;