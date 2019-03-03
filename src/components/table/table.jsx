import React, { Component } from "react";
import TableHeader from "../table/common/tableHeader";
import TableBody from "../table/common/tableBody";

const Table = ({
  listName,
  columns,
  sortColumn,
  onSort,
  onDeleteTableItem,
  onEditTableItem,
  onLikeItem,
  pageItems
}) => {
  return (
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
  );
};

export default Table;
