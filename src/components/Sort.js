import React, { Component } from 'react';

class Sort extends Component {
render() {
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
                <li>
                    <div role="button" className="sort_selected" >
                        <span className="fa fa-sort-alpha-asc pr-5">
                            Tên A-Z
                            </span>
                    </div>
                </li>
                <li>
                    <div role="button" className="sort_selected">
                        <span className="fa fa-sort-alpha-desc pr-5">
                            Tên Z-A
                            </span>
                    </div>
                </li>
                <li role="seperator" className="divider" />
                <li />

                <li>
                    <div role="button"> Trạng thái kích hoạt</div>
                </li>
                <li>
                    <div role="button"> Trạng thái ẩn</div>
                </li>
            </ul>

        </div>
    </div>
                
        );
    }
}

export default Sort;