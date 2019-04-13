import React, { Component } from "react";
import TableHeader from "../table/common/tableHeader";
import TableBody from "../table/common/tableBody";

const Table = ({
  user,
  listName,
  columns,
  sortColumn,
  onSort,
  onDelete,
  onEdit,
  onLikeItem,
  pageItems,
  onDetail,
  onTrade
}) => {
  return (
    <table className="table table-hover">
      <TableHeader
        listName={listName}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody
        listName={listName}
        onTrade={onTrade}
        onDetail={onDetail}
        onDelete={onDelete}
        onEdit={onEdit}
        onLikeItem={onLikeItem}
        pageItems={pageItems}
        columns={columns}
      />
    </table>
  );
};

export default Table;
