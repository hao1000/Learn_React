// Root - Reducer 

import { combineReducers } from 'redux';
import tasksHao from './task' // Nhận actions
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';

const myReducer  = combineReducers({
    tasksHao, // task : tasks
    isDisplayForm , // isDisplayForm : isDisplayForm
    itemEditting
});

export default myReducer;
