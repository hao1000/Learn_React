import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
import {connect} from 'react-redux'
import * as actions from './actions/index'


class App extends Component {

    constructor(props){
        super(props);
        this.state={     // Khai bao cac state  va kieu cua no
            keyword:'',
            filterName:'',
            filterStatus:'-1',
            itemEditing:null,
            sortBy:'name',
            sortValue:1
        };
    }


    onToggleForm=()=>{
    
        this.props.onToggleForm();
    }


    onShowForm =()=>{
        this.setState({
            isDisplayForm:true
        });
    }
    // onSubmit =(data) => {
    //     //console.log(data);
    //     var {tasks}=this.state;  // task = this.state.tasks

    //     if(data.id===''){
    //         data.id=this.generateID();
    //         tasks.push(data);
    //     }else{
    //             // Editting 
    //             var index =this.findIndex(data.id);
    //             tasks[index]=data;
    //     }

    //     this.setState({
    //             tasks:tasks,
    //             taskEditting:null
    //     });
    //     localStorage.setItem('tasks',JSON.stringify(tasks));

    // }
    onUpdateStatus = (id) => {
       // console.log(id);
       var {tasks} = this.state; 
       var index = this.findIndex(id);
       console.log(index);
        if(index !==-1){
            tasks[index].status=!tasks[index].status;
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    findIndex = (id_in) => {
        var {tasks} = this.state;
        var result =-1;
        tasks.forEach((tasks,index) => {
            if(tasks.id===id_in){
                result= index;
            }
        });
        return result;
    }
    onDelete =(id) => {
         // console.log(id);
       var {tasks} = this.state; 
       var index = this.findIndex(id);
      // console.log(index);
        if(index !==-1){
            tasks.splice(index,1);
            this.setState({
                tasks:tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    onUpdate =(id) => {
        var {tasks} = this.state; 
        var index = this.findIndex(id);
        var taskEditting = tasks[index] ;
        this.setState({
           taskEditting:taskEditting
       });

        this.onShowForm();


       //console.log(this.state.taskEditting);
    }
    // Khai bao ham de lay ra SU DUNG
    onFilter=(name_filter,status_filter) => {
        //console.log(name_filter, '-' , status_filter);

        status_filter=parseInt(status_filter,10);
        this.setState({
                filter:{
                    name:name_filter.toLowerCase(),
                    status:status_filter
                }
        });
    }

    onSearch =(keyword) => {
      //  console.log(keyword)
        this.setState({
            keyword : keyword
        });
    }
    onSort =(sortBy,sortValue) => {
     //  console.log(sortBy , ':',sortValue);
     // Set 2 bien vao state  
     this.setState({
         
             sortBy:sortBy,
             sortValue:sortValue
         
     });

    // console.log(this.state);
    }
    render() {
        var {
       
            taskEditting,
           // filter,
            //keyword,
            sortBy,
            sortValue      
        } = this.state; // var tasks=this.state.tasks

        var {isDisplayForm}  = this.props;

        //console.log(filter);
        // if(filter){
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //     tasks = tasks.filter((task) => {
        //         if (filter.status === -1) {
        //             return task;
        //         } else {
        //             return task.status === (filter.status === 1 ? true : false)
        //         }
        //     });
        // }
    
        // if(keyword){
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword)!==-1;
        //     });
        // }
        // Open Form Add
        //alert("render");
        var elmTaskForm=isDisplayForm ? <TaskForm  
                                      
                                            task={taskEditting}
                                        /> 
                                        : '';
        // Sort:
                                        //   console.log(sortBy , ':' , sortValue);
        // if(sortBy==='name'){
        //     tasks.sort((a,b) =>{
        //         if(a.name > b.name) return sortValue;
        //         else if(a.name <b.name ) return -sortValue;
        //         else return 0;
        // });
        // }else{
        //         tasks.sort((a,b) =>{
        //         if(a.status > b.status) return -sortValue;
        //         else if(a.status <b.status ) return sortValue;
        //         else return 0;
       //  });
     
            return (

                <div className="container">
                    <div className="text-center ">
                        <h1>React - Redux - React Router - Connect API </h1>
                        <hr />
                    </div>
                    <div className="row">
                            <div className= {isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                                                            :"col-xs-4 col-sm-4 col-md-4 col-lg-4"
                                            }>
                                {/* Form */}
                            {elmTaskForm }
                            </div>
                            
                        <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                                                        :'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>

                            <button type="button" className="btn btn-primary"
                                    onClick={this.onToggleForm}   
                            >
                                <span className="fa fa-plus mr-5"></span>
                                Add 
                            </button> <br/><br/>
                            <div> {/* &nbsp; */}
                            
                            {/* <button type="button" className="btn btn-danger"
                            onClick={this.onGenarateData}
                            >
                                <span className="fa fa-plus mr-5"></span>
                            Generate Data
                            </button><br/><br/> */}
                            </div>
                        
                            {/* //Search_Sort */}
                            
                            <Control 
                                onSearch = {this.onSearch} 
                                
                                onSort   = {this.onSort}
                                sortBy={sortBy}
                                sortValue={sortValue}
                                
                                />
                            {/*//List */}
                            <TaskList  
                            // Truyen data tu con -> cha thi khai bao cac function de nhan lai
                               
                                onUpdateStatus ={this.onUpdateStatus}
                                onDelete={this.onDelete} 
                                onUpdate={this.onUpdate}
                                onFilter ={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            );
            
    }
}

const mapStateToProps = state =>{
    return {
        isDisplayForm:state.isDisplayForm
    };
}
// Goi Action open Form
const mapDispathToProps =(dispatch,props) =>{
    return {
        onToggleForm :() => {
            dispatch(actions.toggleForm());
        }
      
    };
}

export default connect(mapStateToProps,mapDispathToProps) (App);