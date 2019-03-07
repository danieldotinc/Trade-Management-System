import React, { Component } from "react";
import Table from "../table/table";

const MoviesTable = ({
  listName,
  columns,
  sortColumn,
  onSort,
  itemsCount,
  onDeleteTableItem,
  onEditTableItem,
  onLikeItem,
  pageItems,
  showDetailModal
}) => {
  return (
    <React.Fragment>
      <div className="m-3 h6 mr-5">
        {itemsCount == 0
          ? "هیچ آیتمی برای نمایش وجود ندارد"
          : `تعداد ${itemsCount} آیتم در پایگاه داده وجود دارد.`}
      </div>

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
    </React.Fragment>
  );
};

export default MoviesTable;
