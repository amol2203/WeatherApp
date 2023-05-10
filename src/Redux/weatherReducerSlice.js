import { createSlice } from "@reduxjs/toolkit";



let WeatherReducerSlice = createSlice({
    name :'weather',
    initialState:{
        weatherList:[],
        weatherDetails:null,
        weatherImage:null
    },
    reducers:{
        setWeatherDetails:(state,action) => {
            state.weatherDetails = action.payload;
        },
        setWeatherList:(state,action) =>{
            state.weatherList = action.payload;
        }
    },

});

export default WeatherReducerSlice;
export const { setWeatherDetails, setWeatherList,setWeatherImage } = WeatherReducerSlice.actions;