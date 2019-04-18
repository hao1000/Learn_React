// Store 

import { combineReducers } from 'redux';
import tasks from './task' // Nhận actions
import isDisplayForm from './isDisplayForm';

const myReducer  = combineReducers({
    tasks, // task : tasks
    isDisplayForm  // isDisplayForm : isDisplayForm
});

export default myReducer;
