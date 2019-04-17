import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect } from 'react-redux'; // Ket noi voi Store de len lay xuong


class TaskList extends Component {

    constructor(props){
        super(props);
            this.state={
                filterName:'',
                filterStatus:-1
            }
        }

    onChange=(event)=>{

        var targets = event.target;

        var name   = targets.name;
        var value  = targets.value;
        // Khai bao truyen qua Cha :
        this.props.onFilter(name==='filterName' ? value : this.state.filterName,
                            name ==='filterStatus' ? value: this.state.filterStatus
        )
        this.setState({
                [name]:value
        });
    }

render() {
   

    var tasks =this.props.tasks_get;// var tasks =this.props.tasks

   // var {tasks_get} =this.props.tasks_get;// var tasks =this.props.tasks
  //var {filterName,filterStatus}=this.state;

    var elmTaskItem =tasks.map((task,index)=>{
        // var elmTaskItem =tasks.map((task,index)=>{

            return <TaskItem
                key={task.id}
                index={index} 
                task={task}
                
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete ={this.props.onDelete}
                onUpdate ={this.props.onUpdate}
            />
    });

    return (
                <table className="table table-bordered table-hover mt-15">
            
                <thead>
                    <tr>
                        <th className="text-center"> STT</th>
                        <th className="text-center"> Tên</th>
                        <th className="text-center"> Trạng Thái</th>
                        <th className="text-center"> Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>    
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="filterName"
                                value={this.state.filterName}
                                onChange={this.onChange}    
                            ></input>

                        </td>
                        <td>

                            <select 
                                name="filterStatus" 
                                className="form-control"
                                value={this.state.filterStatus}
                                onChange ={this.onChange}
                                >
                                    <option value={-1}>Tất Cả</option>
                                    <option value={0}>Ẩn</option>
                                    <option value={1}>Kích Hoạt</option>
                            </select>

                        </td>
                        <td></td>
                    </tr>
                    {elmTaskItem}
                </tbody>
            </table>

            );
        }
}
//  Cac State cua Store se chuyen thanh cac props cua components
// 
const mapStatetoProps =(state) => {  // state của store
    return {
        tasks_get: state.tasks // Key : tasks / value : state( trong store - reducer)
        // Lay tasks tren Store xuong
       
    }
};

// const mapDispatchToProps =(dispatch,props) => {
//     return {
//         onAddTask : (tasks) => {
//             dispatch()
//         }
//     }
// } 

//
export default connect(mapStatetoProps,null) (TaskList);