import React, { Component } from "react";
import auth from "../../../services/authService";
import uuid from "uuid";
import Delete from "../../Modal/delete";
import Diversity from "../../Modal/diversity";
import { connect } from "react-redux";
import { getSettingItems } from "../../../actions/settingActions";
import Like from "./like";
import _ from "lodash";
import { PersianNum, EngNum } from "./persiandigit";

class TableBody extends Component {
  componentDidMount() {
    this.props.getSettingItems();
  }

  renderCell = (item, column) => {
    if (column.path == "img")
      return (
        <img
          style={{ maxHeight: "50px", maxWidth: "50px", borderRadius: "10px" }}
          className="shadow rounded"
          src={
            _.get(item, column.path) &&
            require(`../../../../public/${_.get(item, column.path)}`)
          }
        />
      );
    else if (column.path.includes("Price"))
      return PersianNum(parseInt(_.get(item, column.path)).toLocaleString());
    else if (
      column.path == "imgFiles" ||
      column.path == "imgFile" ||
      column.path == "file" ||
      column.path == "files" ||
      column.path == "imgs"
    ) {
      return;
    } else return PersianNum(_.get(item, column.path));
  };

  generateKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const user = auth.getCurrentUser();
    const {
      pageItems,
      columns,
      onDelete,
      onEdit,
      onTrade,
      onDiversity,
      onLikeItem,
      listName,
      onDetail,
      settings,
      loadingSetting
    } = this.props;
    if (loadingSetting && !settings) return <h1>Loading...</h1>;
    return (
      <tbody>
        {pageItems.map(item => (
          <tr key={uuid.v4()}>
            {columns.map(column => (
              <td
                onClick={() => onDetail(item)}
                style={{ cursor: "pointer" }}
                key={uuid.v4()}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
            {/* <td key={uuid.v4()}>
              <Like movie={item} onClick={() => onLikeItem(item, listName)} />
            </td> */}
            <td key={uuid.v4()}>
              {listName == "Product" &&
                (settings[0].addAction || user.isAdmin) && (
                  <Diversity
                    onDiversity={onDiversity}
                    item={item}
                    classes="ml-2"
                  />
                )}
              {listName == "Product" &&
                (settings[0].processAction || user.isAdmin) && (
                  <button
                    className="btn btn-raised btn-secondary ml-2 shadow rounded"
                    data-placement="top"
                    title="بازرگانی"
                    onClick={() => onTrade(item)}
                  >
                    <i className="fa fa-calculator" />
                  </button>
                )}
              {(settings[0].editAction || user.isAdmin) && (
                <button
                  className="btn btn-raised btn-dark ml-2 shadow rounded"
                  data-placement="top"
                  title="ویرایش"
                  onClick={() => onEdit(item)}
                >
                  <i className="fa fa-wrench" />
                </button>
              )}

              {(settings[0].deleteAction || user.isAdmin) && (
                <Delete onDelete={onDelete} item={item} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems }
)(TableBody);
