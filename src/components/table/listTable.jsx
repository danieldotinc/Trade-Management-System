import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  render() {
    const {
      listName,
      columns,
      sortColumn,
      onSort,
      itemsCount,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      pageItems
    } = this.props;
    return (
      <React.Fragment>
        <div className="m-3 h5">
          {itemsCount == 0
            ? "هیچ آیتمی برای نمایش وجود ندارد"
            : `تعداد ${itemsCount} آیتم در پایگاه داده وجود دارد.`}
        </div>
        <table className="table">
          <TableHeader
            listName={listName}
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody
            listName={listName}
            onDeleteTableItem={onDeleteTableItem}
            onEditTableItem={onEditTableItem}
            onLikeItem={onLikeItem}
            pageItems={pageItems}
            columns={columns}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
