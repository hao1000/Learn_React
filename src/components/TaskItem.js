import React, { Component } from 'react';
import {connect } from 'react-redux'; // Ket noi voi Store de len lay xuong
import * as actions from './../actions/index';

class TaskItem extends Component {

    onUpdateStatus =() => {
       //console.log(this.props.task.id);
       // this.props.onUpdateStatus(this.props.task.id)  -- React
          this.props.onUpdateStatus(this.props.task.id); // -- Redux
    }

    onDelete =() =>{
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }
    onEditTask =() => {
        //this.props.onSelectedItem(this.props.task.id); //-- Ract
        this.props.onOpenForm(); 
        this.props.onEditTask(this.props.task);
      
    }
render() {
    return (    
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td>{this.props.task.name}</td>
                    <td className="text-center">
                            {this.onEditTask()}
                    </td>
            
                    <td className="text-center">
                        <button 
                            type="button" 
                            className="btn btn-warning"
                            onClick={this.onEditTask}
                        >
                            <span
                                className="fa fa-edit mr-5"></span>
                            Sửa</button>&nbsp;
                                <button type="button" className="btn btn-danger"
                            onClick={this.onDelete}
                        >
                            <span className="fa fa-trash mr-5"></span>
                            Xóa</button>
                    </td>
                </tr>
            );
    }
}

const mapStateToProps = state =>{
    return {
        // State lat tu store -> chuyen qua props -> chuyen len tren de su sung 
    };
}
// Goi Action update status khi nhan button status 
const mapDispathToProps =(dispatch,props) =>{
    return {
        onUpdateStatus :(id) => {
            dispatch(actions.updateStatus(id));
        } ,

        onDelete:(id)=>{
            dispatch(actions.deleteTask(id));   
            // Closse Form :  
        },

        onCloseForm :()=>{
            dispatch(actions.closeForm());
        },
        onOpenForm :()=>{
            dispatch(actions.openForm());
        },
        onEditTask :(task)=>{
            dispatch(actions.editTask(task));
        }
    };
}

export default connect(mapStateToProps,mapDispathToProps) (TaskItem);
