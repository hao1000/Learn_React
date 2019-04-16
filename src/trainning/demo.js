import { createStore } from 'redux'

// State ban dau
var initialState={
    status:false,
    sort:{
        by    : 'name',
        value : 1
    }
}

var myReducer =(state = initialState,action) => {
    if(action.type==='TOGGLE_STATUS'){
        state.status=!state.status;
        return state;
    }
    if(action.type ==='SORT'){
        var {by, value}=action.sort; // by=action.by ....
        var {status} = state;   // status = state.status
       return {
           status:status,
           sort:{
               by:by,
               value:value
           }
       }
    }
    return state ;
}

const store = createStore (myReducer);

console.log('Default State : ',store.getState());

// Thuc hien cong viec thay doi status :
var toggleAction = { 
    type: 'TOGGLE_STATUS'
};
store.dispatch(toggleAction);
console.log('TOGGLE_STATUS : ',store.getState());

// Thuc hien cong viec sap xep name tu Z-A
var sortAction ={
    type:'SORT',
    sort:{
        by:'name',
        value:-1
    }
}
store.dispatch(sortAction);
console.log('SORT:',store.getState());

