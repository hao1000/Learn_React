import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index'

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            status:false
        }        
    }

    componentWillMount()
    {
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status,         
            });          
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id:nextProps.task.id,
                name:nextProps.task.name,
                status:nextProps.task.status,               
            });
            
        }else if(!nextProps.task){
            this.setState({
                id:'',
                name:'',
                status:false
            });
        }
    }

    onCloseForm =() => {
        this.props.onCloseForm();
    }
    onChange =(event) => {

        var target = event.target;

        var name = target.name;
        var value =target.value;

        if(name==='status'){
            value=target.value==='true' ? true :false;
        }
        this.setState({
            [name] : value
        });
    }
    onSubmit = (event) => {
        event.preventDefault(); // Khong cho load lai Form 
       // this.props.onSubmit(this.state);
        // Cancel & Save Form :
        this.props.onAddTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () =>{
        this.setState({
            name:'',
            status:false
        });
}

    render() {
        var{id}=this.state;
        return (

            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                    {id !==''?'Cập Nhật Công Việc':'Thêm Công Việc'} 
                
                    <span className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                    ></span>

                    </h3>
                </div>

                <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name" 
                                value={this.state.name}
                                onChange={this.onChange}
                            ></input>
                        </div>

                        <label>Trạng Thái : </label>
                        <select name="status" className="form-control"
                        value={this.state.status}
                        onChange={this.onChange}
                        
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>

                        </select><br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>
                                Lưu Lại </button>&nbsp;

                            <button type="button" className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                <span className="fa fa-plus mr-5"></span>
                                Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => { // Vì có 1 tham số nên có thể bỏ ()
    // Phải trả về 1 object
    return { 

    }
};
// Gửi tới Reducer 
// Chuyển dispath thành props 
const mapDispatchToProps = (dispath,props) => {
    return{
        onAddTask :( task) => {
            dispath(actions.addTask(task)); // Từ action đã import
        },
        onCloseForm :()=>{
            dispath(actions.closeForm());
        }
    }
}
// Connect : tham số thứ 2 là 1 action
export default  connect(mapStateToProps,mapDispatchToProps)(TaskForm);