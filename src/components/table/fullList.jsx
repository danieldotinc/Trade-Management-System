import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import ListTable from "./listTable";
import _ from "lodash";

export class FullList extends Component {
  render() {
    const {
      items,
      pageSize,
      currentPage,
      genres,
      sortColumn,
      onGenreChange,
      selectedGenre,
      onPageChange,
      columns,
      onDeleteTableItem,
      onLikeItem,
      onSort
    } = this.props;

    const sortedItems = _.orderBy(items, [sortColumn.path], [sortColumn.order]);
    const pageItems = Paginate(sortedItems, pageSize, currentPage);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListItem
              genres={genres}
              onGenreChange={onGenreChange}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col">
            <ListTable
              sortColumn={sortColumn}
              itemsCount={items.length}
              onSort={onSort}
              pageItems={pageItems}
              columns={columns}
              onDeleteTableItem={onDeleteTableItem}
              onLikeItem={onLikeItem}
            />
            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={items.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FullList;
