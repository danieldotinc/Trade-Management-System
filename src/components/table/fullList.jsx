import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import ListTable from "./listTable";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";

export class FullList extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    const {
      listName,
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
      onEditTableItem,
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
              listName={listName}
              genres={genres}
              onGenreChange={onGenreChange}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-info btn-lg ml-3"
              onClick={this.handleShow}
              style={{ float: "right" }}
            >
              افزودن
            </button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>افزودن مورد جدید</Modal.Title>
              </Modal.Header>
              <Modal.Body>افزودن جزیئات</Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-lg btn-primary ml-2"
                  onClick={this.handleClose}
                >
                  ذخیره
                </button>
                <button className="btn btn-danger" onClick={this.handleClose}>
                  لغو
                </button>
              </Modal.Footer>
            </Modal>
            <ListTable
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
