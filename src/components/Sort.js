import React, { Component } from 'react';

class Sort extends Component {

constructor(props){
    super(props);
    this.state={
        sort:{
            by:'name',
            value:1
        }
    }
}

onClick=(sortBy,sortValue) => {
    
    this.setState({
        sort:{
            by:sortBy,
            value:sortValue
        }
    });
  this.props.onSort(this.state.sort);
  console.log(this.state) 
}

render() {
    var{sort} = this.state;
return (
    < div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >

        <div className="dropdown">

            <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
            >
                Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>

            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={ () => this.onClick('name',1) }>
                    <div 
                        role="button" 
                        className={
                            (sort.by==='name' && sort.value===1)
                            ?'sort_selected':''
                            } >
                        <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                            </span>
                    </div>
                </li>
                <li onClick={ () => this.onClick('name',-1) }>
                    <div role="button"
                       className={
                        (sort.by==='name' && sort.value===-1)
                        ?'sort_selected':''
                        } >
                        <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                            </span>
                    </div>
                </li>
                <li role="seperator" className="divider" />
                <li />

                <li onClick={ () => this.onClick('status',1) }>
                    <div role="button"
                    className={
                            (sort.by==='status' && sort.value===1)
                            ?'sort_selected':''
                            } >
                    Trạng thái kích hoạt</div>
                </li>
                <li onClick={ () => this.onClick('status',-1) }>
                    <div role="button" 
                    className={
                            (sort.by==='status' && sort.value===-1)
                            ?'sort_selected':''
                            } >
                    Trạng thái ẩn</div>
                </li>
            </ul>

        </div>
    </div>
                
        );
    }
}

export default Sort;