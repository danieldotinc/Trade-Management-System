import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import ListTable from "./listTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import Search from "./common/search";
import ItemsCount from "./common/itemsCount";
import { PersianNum } from "./common/persiandigit";

export class FullList extends Component {
  state = {
    items: [],
    search: ""
  };

  handleSearch = search => {
    const { items } = this.props.state;
    if (search != "") {
      const filteredItems = items.filter(i => i.name.includes(search));
      this.props.onPageChange(1);
      this.setState({ items: filteredItems, search });
    } else {
      this.setState({ items, search });
    }
  };

  render() {
    const {
      listName,
      columns,
      sortColumn,
      currentPage,
      pageSize,
      types,
      selectedGenre
    } = this.props.state;
    const {
      classes,
      onPageChange,
      onGenreChange,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      onSort,
      onShowDetailModal
    } = this.props;

    const searchedItems =
      this.state.search == "" ? this.props.state.items : this.state.items;
    const sortedItems = _.orderBy(
      searchedItems,
      [sortColumn.path],
      [sortColumn.order]
    );
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
          <Search
            search={PersianNum(this.state.search)}
            onSearch={this.handleSearch}
          />
          <ItemsCount itemsCount={PersianNum(sortedItems.length)} />

          <ListTable
            showDetailModal={onShowDetailModal}
            listName={listName}
            sortColumn={sortColumn}
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
            itemsCount={sortedItems.length}
            onPageChange={onPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FullList;
