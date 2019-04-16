import React, { Component } from 'react';

class Sort extends Component {

componentWillReceiveProps(nextProps){
    //console.log(nextProps);
}

onClick=(sortBy,sortValue) => {
   // console.log(sortBy,':',sortValue);
    this.props.onSort(sortBy,sortValue);
  //this.props.onSort(this.state.sort);

}

render() { 
//    var{sort} = this.state;
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
                Sort <span className="fa fa-caret-square-o-down ml-5"></span>

            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={ () => this.onClick('name',1) }>
                    <div 
                        role="button" 
                        className={(this.props.sortBy==='name' && this.props.sortValue===1)?'sort_selected':''}
                       >
                        <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                            </span>
                    </div>
                </li>
                <li onClick={ () => this.onClick('name',-1) }>
                    <div role="button"
                        className={(this.props.sortBy==='name' && this.props.sortValue===-1)?'sort_selected':''}
                     >
                        <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                            </span>
                    </div>
                </li>
                <li role="button" className="divider" />
                <li />

                <li onClick={ () => this.onClick('status',1) }>
                    <div role="button"
                    className={(this.props.sortBy==='status' && this.props.sortValue===1)?'sort_selected':''}
               >
                    Trạng thái kích hoạt</div>
                </li>
                <li onClick={ () => this.onClick('status',-1) }>
                    <div role="button" 
                    className={(this.props.sortBy==='status' && this.props.sortValue===-1)?'sort_selected':''}
                    >
                    Trạng thái ẩn</div>
                </li>
            </ul>

        </div>
    </div>
                
        );
    }
}

export default Sort;