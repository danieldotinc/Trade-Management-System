import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import ListTable from "./listTable";
import _ from "lodash";

export class FullList extends Component {
  render() {
    const {
      listName,
      items,
      columns,
      sortColumn,
      currentPage,
      pageSize,
      types,
      selectedGenre
    } = this.props.state;
    const {
      onPageChange,
      onGenreChange,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      onSort,
      onShowDetailModal,
      onStep,
      onNewForm
    } = this.props;

    const sortedItems = _.orderBy(items, [sortColumn.path], [sortColumn.order]);
    const pageItems = Paginate(sortedItems, pageSize, currentPage);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListItem
              listName={listName}
              types={types}
              onGenreChange={onGenreChange}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-info btn-lg ml-3"
              data-toggle="modal"
              data-target="#addnewperson"
              style={{ float: "right" }}
              onClick={() => onNewForm("addnewform")}
            >
              افزودن
            </button>

            <ListTable
              showDetailModal={onShowDetailModal}
              listName={listName}
              sortColumn={sortColumn}
              itemsCount={items.length}
              onSort={onSort}
              pageItems={pageItems}
              columns={columns}
              onDeleteTableItem={onDeleteTableItem}
              onEditTableItem={onEditTableItem}
              onLikeItem={onLikeItem}
            />
            <Pagination
              listName={listName}
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
