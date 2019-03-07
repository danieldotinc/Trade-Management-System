import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import ListTable from "./listTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import Search from "./common/search";

export class FullList extends Search {
  state = {
    search: ""
  };

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

    // const search = this.state.search;
    // const myitems = { ...items };
    // if (search != "") {
    //   myitems = Object.keys(myitems).map((keyName, i) => {
    //     if (myitems[i][keyName].include(search)) {
    //       console.log(myitems[i]);
    //     }
    //   });
    // }

    // console.log(SearchedItems);
    const sortedItems = _.orderBy(items, [sortColumn.path], [sortColumn.order]);
    const pageItems = Paginate(sortedItems, pageSize, currentPage);

    return (
      <React.Fragment>
        <div className="m-4">
          {/* <div className="col-3">
            <ListItem
              listName={listName}
              types={types}
              onGenreChange={onGenreChange}
              selectedGenre={selectedGenre}
            />
          </div> */}
          {this.renderSearch()}
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
      </React.Fragment>
    );
  }
}

export default FullList;
