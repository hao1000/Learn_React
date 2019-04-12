import React, { Component } from 'react';

class Search extends Component
 {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {

        var target = event.target;

        var name = target.name;
        var value = target.value;
        this.setState  ({
            [name]: value
        });
    }
    onSearch = () => {
         //console.log(this.state);
         this.props.onSearch(this.state.keyword); // Truyen ra ngoai         
    }

    render()
     {
        var { keyword } = this.state; // Khai bao de su dung o duoi
        return (
            //  Search  : 
            < div className = "col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <div className="input-group">

                    <input 
                        name="keyword"
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa ..."
                        value={keyword}
                        onChange={this.onChange}
                    />

                    <span className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onSearch}
                        >
                            <span className="fa fa-search mr-5"> </span>
                            Search</button>
                    </span>

                </div>
                
             </div >
                
        );
    }
}

export default Search;