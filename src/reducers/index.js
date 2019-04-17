// Store 

import { combineReducers } from 'redux';
import tasks from './task' // Nhận actions

const myReducer  = combineReducers({
    tasks
});

export default myReducer;
