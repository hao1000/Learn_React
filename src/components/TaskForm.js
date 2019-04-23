import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index'

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state={};      
    }
    componentWillMount()
    {
        if(this.props.itemEditting && this.props.itemEditting.id !=null){
            this.setState({
                id:this.props.itemEditting.id,
                name:this.props.itemEditting.name,
                status:this.props.itemEditting.status,         
            });          
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditting){
            this.setState({
                id:nextProps.itemEditting.id,
                name:nextProps.itemEditting.name,
                status:nextProps.itemEditting.status,               
            });
            
        }else{
            this.onClear();
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
                id:'',
                name:'',
                status:false
            });
        }
    onExitForm=() => {
            this.props.onCloseForm();
        }

    render() {
      
      if(!this.props.isDisplayForm) return '';
        return (

            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                    {!this.state.id ? 'Thêm Công Việc':'Cập Nhật Công Việc'} 
                
                    <span className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
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
                                // Set name
                                 value={this.state.name}
                               
                                onChange={this.onChange}
                            ></input>
                        </div>

                        <label>Trạng Thái : </label>
                        <select name="status" className="form-control"
                        //Set status
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
        isDisplayForm:state.isDisplayForm ,// State lat tu store -> chuyen qua props -> chuyen len tren de su sung 
        itemEditting:state.itemEditting
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