import * as types from './../constants/ActionTypes';
//  Reducers 
var s4 = () => {
    return Math.floor((1+Math.random())*0x1000).toString(16).substring(1);
}
var generateID = () => {
        return s4() + s4() + '-' + s4();
}

var findIndex = (tasks,id_in) => {
    var result =-1;
    tasks.forEach((tasks,index) => {
        if(tasks.id===id_in){
            result= index;
        }
    });
    return result;
}

var data =JSON.parse(localStorage.getItem('tasks')); // Lay data tu localStorage

var initialState  = data ? data :[] ;


var myReducer =(state=initialState,action) => {
    var id='';
    var index = -1; 
   // console.log('reducer dau tien :' , action.type);
    switch(action.type){
        
        // case types.LIST_ALL:
        //     console.log("Hien thi danh sach");
        //     return state;
           
        case types.ADD_TASK:
       
            var newTask ={
                id:generateID(),
                name : action.task.name,
                status:action.task.status ===true ? true:false
            }
         
            // Add task mới vào state
            state.push(newTask);
           // console.log(action);
            // Save localstoge 
            localStorage.setItem('tasks',JSON.stringify(state));
          //  console.log(state);

            return [...state]; // return state : tránh trường hợp bị tham chiếu
        case types.UPDATE_STATUS_TASK:
         //   console.log(action)
             id=action.id;
             index = findIndex(state,id);
            

           // state[index].status=!state[index].status;

         //  var cloneTask = {...state[index] };
          // cloneTask.status=!cloneTask.status;

           // state[index]=cloneTask;
        //    state.splice(index,1); Xoa
        //    state.push(cloneTask); Push

            state[index]={
                ...state[index],
                status:!state[index].status
            };
            localStorage.setItem('tasks',JSON.stringify(state));

                return[...state];
        
        case types.DELETE_TASK:
             id =action.id;
             index = findIndex(state,id);
            state.splice(index,1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return[...state];

        default:return state;
    }
};

export default myReducer;