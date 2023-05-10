import {configureStore} from '@reduxjs/toolkit';
import { reducer } from './combineReducer';
let store = configureStore({reducer})

export default store;

