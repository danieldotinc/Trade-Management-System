import React, { Component } from "react";
import _ from "lodash";

const Pagination = props => {
  const pagesCount = Math.ceil(props.itemsCount / props.pageSize);
  if (pagesCount == 1) {
    return null;
  }
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={
              props.currentPage == page ? "page-item active" : "page-item"
            }
            style={{ cursor: "pointer" }}
            key={page}
            onClick={() => props.onPageChange(page)}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
