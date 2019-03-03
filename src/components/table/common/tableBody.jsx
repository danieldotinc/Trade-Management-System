import React, { Component } from "react";
import uuid from "uuid";
import Like from "./like";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  generateKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const {
      pageItems,
      columns,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      listName
    } = this.props;
    return (
      <tbody>
        {pageItems.map(item => (
          <tr key={item.id}>
            {columns.map(column => (
              <td key={this.generateKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
            <td key={uuid.v4()}>
              <Like movie={item} onClick={() => onLikeItem(item, listName)} />
            </td>
            <td key={uuid.v4()}>
              <button
                className="btn btn-dark ml-2"
                onClick={() => onEditTableItem(item.id, listName)}
              >
                <i className="fa fa-wrench" />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteTableItem(item.id, listName)}
              >
                <i className="fa fa-trash-alt" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
