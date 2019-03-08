import React, { Component } from "react";
import Table from "../table/table";

const MoviesTable = ({
  listName,
  columns,
  sortColumn,
  onSort,
  onDeleteTableItem,
  onEditTableItem,
  onLikeItem,
  pageItems,
  showDetailModal
}) => {
  return (
    <Table
      showDetailModal={showDetailModal}
      listName={listName}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      onDeleteTableItem={onDeleteTableItem}
      onEditTableItem={onEditTableItem}
      onLikeItem={onLikeItem}
      pageItems={pageItems}
    />
  );
};

export default MoviesTable;
