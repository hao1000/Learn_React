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
           // filter,
            //keyword,
            sortBy,
            sortValue      
        } = this.state; // var tasks=this.state.tasks

        var {isDisplayForm}  = this.props; //

            return (

                <div className="container">
                    <div className="text-center ">
                        <h1>React - Redux - React Router - Connect API </h1>
                        <hr />
                    </div>
                    <div className="row">
                            <div className= {isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                                                            :""}>
                              <TaskForm/>
                            </div>
                            
                        <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                                                        :'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>

                            <button type="button" className="btn btn-primary"
                                    onClick={this.onToggleForm}>
                                <span className="fa fa-plus mr-5"></span>
                                Add 
                            </button> <br/><br/>
                        
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
                               
                              //  onUpdateStatus ={this.onUpdateStatus}
                               // onDelete={this.onDelete} 
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
        isDisplayForm:state.isDisplayForm // State lat tu store -> chuyen qua props -> chuyen len tren de su sung 
    };
}
// Goi Action open Form khi nhan button Add 
const mapDispathToProps =(dispatch,props) =>{
    return {
        onToggleForm :() => {
            dispatch(actions.toggleForm());
        }     
    };
}

export default connect(mapStateToProps,mapDispathToProps) (App);