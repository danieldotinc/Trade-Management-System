import React, { Component } from "react";
import auth from "../../../services/authService";
import uuid from "uuid";
import Like from "./like";
import _ from "lodash";
import { PersianNum, EngNum } from "./persiandigit";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.path == "img")
      return (
        <img
          style={{ maxHeight: "50px", maxWidth: "50px", borderRadius: "10px" }}
          className="shadow rounded"
          src={
            _.get(item, column.path) &&
            require(`../../../${_.get(item, column.path)}`)
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
      onLikeItem,
      listName,
      onDetail
    } = this.props;
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
              <button
                className="btn btn-raised btn-dark ml-2 shadow rounded"
                onClick={() => onEdit(item)}
              >
                <i className="fa fa-wrench" />
              </button>
              {user.isAdmin && (
                <button
                  className="btn btn-danger shadow rounded"
                  onClick={() => onDelete(item)}
                >
                  <i className="fa fa-trash-alt" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
