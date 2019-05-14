import React from "react";
import BaseComponent from "components/common/BaseComponent";
import { connect } from "react-redux";
import * as actions from "actions/Actions";
import * as ApiConstants from "constants/ApiConstants";
import * as CommonConstants from "constants/CommonConstants";
import moment from "moment";

class Details extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: []
    };
  }

  searchByUrl = () => {
    const param = this.props.match.params["key"];
    let key = param.split("@")[0];
    const searchParam = {
      mode: 0,
      key: key,
      tag_id: "",
      ext: "",
      pos: 0,
      output: ""
    };

    this.props.setSearchParam(searchParam);
    return searchParam;
  };

  getTypeStyle = type => {
    let style = "type-png";
    switch (type) {
      case "REG":
        style = "type-reg";
        break;
      case "COM":
        style = "type-com";
        break;
      default:
        break;
    }
    return style;
  };

  formatBytes = (bytes, decimals) => {
    if (bytes === 0) return <td>0</td>;
    const k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      <td>
        {parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}
        <span className="font-small">{sizes[i]}</span>
      </td>
    );
  };

  fileTagMouseOver = value => {
    const file = this.state.fileInfo;
    for (let i = 0; i < file.length; i++) {
      if (value.file === i) {
        for (let j = 0; j < file[i].tag_info.length; j++) {
          if (value.tag === j) {
            if (!file[i].tag_info[j].isFocus) {
              file[i].tag_info[j].isFocus = true;
              this.setState({
                fileInfo: file
              });
            }
          }
        }
      }
    }
  };

  fileTagMouseLeave = value => {
    const file = this.state.fileInfo;
    for (let i = 0; i < file.length; i++) {
      if (value.file === i) {
        for (let j = 0; j < file[i].tag_info.length; j++) {
          if (value.tag === j) {
            if (file[i].tag_info[j].isFocus) {
              file[i].tag_info[j].isFocus = false;
              this.setState({
                fileInfo: file
              });
            }
          }
        }
      }
    }
  };

  highLightKeyInFileName(fileName, key) {
    // Split text on higlight key, include term itself into parts, ignore case
    const parts = fileName.split(new RegExp(`(${key})`, "gi"));
    return (
      <td>
        {parts.map((part, index) =>
          part.toLowerCase() === key.toLowerCase() ? (
            <span key={index} className="marker">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </td>
    );
  }

  getSearchResult = async () => {
    let searchParam = this.props.searchParam;
    let fileInfo = [];
    // set param by direct link
    if (searchParam.tag_id === -1) {
      searchParam = this.searchByUrl();
    }

    // get search result
    const ret = await this.executeApi(
      ApiConstants.GET_SEARCH_RESULT,
      null,
      searchParam,
      null
    );
    if (ret.success) {
      this.props.setSearchResult(ret.data);
      //set dummy tag, to be removed
      for (let i = 0; i < ret.data.file_info.length; i++) {
        let file = {};
        // dummy tag
        const tag_list = [
          {
            tag_id: 1,
            tag_name: "Android"
          },
          {
            tag_id: 2,
            tag_name: "IOS"
          }
        ];
        file.server_name = ret.data.file_info[i].server_name;
        file.file_path = ret.data.file_info[i].file_path;
        file.file_type = ret.data.file_info[i].file_type;
        file.file_name = ret.data.file_info[i].file_name;
        file.file_size = ret.data.file_info[i].file_size;
        file.updatetime = ret.data.file_info[i].updatetime;
        file.tag_info = tag_list;
        fileInfo.push(file);

        // update position
        searchParam.pos = ret.data.rtn_count;
        this.props.setSearchParam(searchParam);
      }
      this.setState({
        fileInfo: fileInfo
      });
    }
  };

  getSearchResultByBottom = async () => {
    let searchParam = this.props.searchParam;
    let fileInfo = this.state.fileInfo;

    // get search result
    const ret = await this.executeApi(
      ApiConstants.GET_SEARCH_RESULT,
      null,
      searchParam,
      null
    );
    if (ret.success) {
      this.props.setSearchResult(ret.data);
      fileInfo = fileInfo.concat(ret.data.file_info);

      this.setState({
        fileInfo: fileInfo
      });

      // update position
      searchParam.pos = ret.data.rtn_count;
      this.props.setSearchParam(searchParam);
    }
  };

  selectType = (type, e) => {
    const searchParam = this.props.searchParam;
    let extList = searchParam.ext.split(",");
    let ext = "";

    //set search param
    e.target.checked
      ? extList.push(type)
      : (extList = extList.filter(e => e !== type));
    extList = extList.filter(e => e !== "");
    if (extList.length > 0) {
      ext = extList[0];
      for (let i = 1; i < extList.length; i++) {
        ext = ext + "," + extList[i];
      }
    }
    searchParam.ext = ext;
    searchParam.pos = 0;
    this.props.setSearchParam(searchParam);

    //get search result
    this.getSearchResult();
  };

  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.getSearchResultByBottom();
    }
  };

  componentDidMount() {
    this.getSearchResult();
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    console.log("render");
    const { searchResult, searchParam } = this.props;
    const { data } = searchResult;
    const file = this.state.fileInfo;
    return (
      <div className="row">
        {/* タブボタン部分 */}
        <ul className="nav nav-tabs w-100">
          <li className="nav-item ml-4">
            <a href="#" className="nav-link active" data-toggle="tab">
              すべて
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" data-toggle="tab">
              デプロイ状況
            </a>
          </li>
        </ul>
        {/* タブのコンテンツ部分 */}
        <div className=" -content w-100">
          <div id="page-details" className="tab-pane active">
            <div className="row w-100">
              <div className="col-10">
                <div className="float-right my-2">
                  <a className="btn btn-csv ml-2">CSV</a>
                </div>
                <div className="mt-3 mb-2 ml-3">
                  {data.hit_count}
                  <span className="font-small ml-1">件</span>
                </div>
              </div>
            </div>
            <div
              className="modal"
              id="type-refine"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
              style={{ display: "none" }}
            >
              <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <ul className="type-refine">
                      {data.type_info.map((type, index) => {
                        return (
                          <li key={index}>
                            <span className={this.getTypeStyle(type)}>
                              {type}
                            </span>
                            <input
                              type="checkbox"
                              onChange={this.selectType.bind(this, type)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-100">
              <div className="col-10">
                <table id="tbl-details" className="table table-striped ml-3">
                  <colgroup>
                    <col width="50px" />
                    <col width="auto" />
                    <col width="50px" />
                    <col width="200px" />
                    <col width="50px" />
                    <col width="150px" />
                    <col width="250px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="ttl-regular">Server</th>
                      <th className="ttl-regular">Directory</th>
                      <th className="ttl-regular">
                        Type
                        <span
                          className="arrow_modal"
                          data-toggle="modal"
                          data-target="#type-refine"
                        />
                      </th>
                      <th className="ttl-regular">File</th>
                      <th className="ttl-regular">Size</th>
                      <th className="ttl-regular">Update</th>
                      <th className="ttl-regular">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {file.map((row, fileIndex) => {
                      const f_size = this.formatBytes(row.file_size);
                      const f_time = moment
                        //.utc(new Date(row.updatetime))
                        .utc(moment(row.updatetime,CommonConstants.FORMAT_DATE.TYPE04))
                        .local()
                        .format(CommonConstants.FORMAT_DATE.TYPE04);

                      const f_highlightName = this.highLightKeyInFileName(
                        row.file_name,
                        searchParam.key
                      );
                      return (
                        <tr key={fileIndex}>
                          <td>{row.server_name}</td>
                          <td> {row.file_path}</td>
                          <td>
                            <span className={this.getTypeStyle(row.file_type)}>
                              {row.file_type}
                            </span>
                          </td>
                          {f_highlightName}
                          {f_size}
                          <td>{f_time}</td>
                          <td>
                            <div className="taglist-container mx-auto">
                              <ul className="taglist-recent">
                                {row.tag_info.map((tag, tagIndex) => {
                                  return (
                                    <li
                                      key={tagIndex}
                                      onMouseOver={this.fileTagMouseOver.bind(
                                        this,
                                        { file: fileIndex, tag: tagIndex }
                                      )}
                                      onMouseOut={this.fileTagMouseLeave.bind(
                                        this,
                                        { file: fileIndex, tag: tagIndex }
                                      )}
                                    >
                                      {tag.tag_name}
                                      {tag.isFocus && (
                                        <span className="icon-delete" />
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-2">
                <div className="ttl-regular mb-1">関連タグ</div>
                <div className="taglist-container mx-auto">
                  <ul className="taglist-recent taglist-side">
                    <li>JavaScript</li>
                    <li>iOS</li>
                    <li>PM</li>
                    <li>login.asp</li>
                    <li>news.info</li>
                    <li>OM</li>
                    <li>Android</li>
                    <li>COM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchParam, searchResult } = state;
  return { searchParam, searchResult };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchResult: result => {
      return dispatch(actions.searchFile(result));
    },
    setSearchParam: param => {
      dispatch(actions.setSearchParm(param));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
