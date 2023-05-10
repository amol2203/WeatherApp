import { combineReducers } from "@reduxjs/toolkit";
import WeatherReducerSlice from "./weatherReducerSlice";

export const reducer = combineReducers ({
    weather:WeatherReducerSlice.reducer,
});


