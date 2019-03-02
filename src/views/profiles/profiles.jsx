import React, { Component } from "react";
import FullList from "../../components/table/fullList";

export class profiles extends Component {
  render() {
    const {
      columns,
      items,
      genres,
      selectedGenre,
      sortColumn,
      onDeleteTableItem,
      onLikeItem,
      currentPage,
      pageSize,
      onPageChange,
      onGenreChange,
      onSort
    } = this.props;
    return (
      <FullList
        columns={columns}
        items={items}
        genres={genres}
        selectedGenre={selectedGenre}
        sortColumn={sortColumn}
        onDeleteTableItem={onDeleteTableItem}
        onLikeItem={onLikeItem}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onGenreChange={onGenreChange}
        onSort={onSort}
      />
    );
  }
}

export default profiles;
