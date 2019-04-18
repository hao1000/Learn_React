import * as types from './../constants/ActionTypes';
//  Reducers 

var initialState  = false // Close Form

var myReducer =(state=initialState,action) => {
    //console.log('action.type :' , action.type);
    switch(action.type){
        case types.TOGGLE_FORM:
            return !state;
        case types.OPEN_FORM:
        state =true;
            return state;
        case types.CLOSE_FORM:
            state =false;
            return state;
        default: return state;
    }
};

export default myReducer;