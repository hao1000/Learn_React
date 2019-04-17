import * as types from './../constants/ActionTypes';
//  Reducers 
var s4 = () => {
    return Math.floor((1+Math.random())*0x1000).toString(16).substring(1);
}
var generateID = () => {
        return s4() + s4() + '-' + s4();
}


var data =JSON.parse(localStorage.getItem('tasks')); // Lay data tu localStorage

var initialState  = data ? data :[] ;


var myReducer =(state=initialState,action) => {
    //console.log('action.type :' , action.type);
    switch(action.type){
        
        case types.LIST_ALL:
            console.log(action);
            return state;
           
        case types.ADD_TASK:
        console.log(action);
            var newTask ={
                id:generateID(),
                name : action.task.name,
                status:action.task.status ==='true' ?true:false
            }
            // Add task mới vào state
            state.push(newTask);
            // Save localstoge 
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state]; // return state : tránh trường hợp bị tham chiếu

        default:return state;
    }
};

export default myReducer;