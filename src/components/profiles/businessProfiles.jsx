import React, { Component } from "react";
import FullList from "../table/fullList";

export class BusinessProfiles extends Component {
  render() {
    const {
      listName,
      columns,
      items,
      genres,
      selectedGenre,
      sortColumn,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      currentPage,
      pageSize,
      onPageChange,
      onGenreChange,
      onSort
    } = this.props;
    return (
      <React.Fragment>
        <h3 className="text-center m-5">اطلاعات کسب و کارها</h3>
        <FullList
          listName={listName}
          columns={columns}
          items={items}
          genres={genres}
          selectedGenre={selectedGenre}
          sortColumn={sortColumn}
          onDeleteTableItem={onDeleteTableItem}
          onEditTableItem={onEditTableItem}
          onLikeItem={onLikeItem}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onGenreChange={onGenreChange}
          onSort={onSort}
        />
      </React.Fragment>
    );
  }
}

export default BusinessProfiles;
