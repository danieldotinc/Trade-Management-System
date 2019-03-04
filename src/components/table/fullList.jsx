import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import ListTable from "./listTable";
import { Button, Modal } from "react-bootstrap";
import PersianDigit from "./common/persiandigit";
import $ from "jquery";
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

  // formValidation(inputid, name, type, divid) {
  //   let msg;
  //   let input = ("#" + inputid).val();
  //   if (input == "" || input == null || typeof input == "undefined") {
  //     msg = "لطفا " + name + " را به درستی وارد کنید.";
  //     $("#" + divid).append('<div class="invalid-feedback">' + msg + "</div>");
  //     $("#" + inputid).addClass("is-invalid");
  //     this.props.formValidation("false");
  //   }
  // }

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
      onSort,
      onStep,
      showDetailModal,
      hideDetailModal,
      detailedModal
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
              data-toggle="modal"
              data-target="#addnewperson"
              style={{ float: "right" }}
            >
              افزودن
            </button>

            <div
              className="modal fade"
              id="addnewperson"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      افزودن شخص
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form id="addnewform1">
                      <div className="form-group m-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="نام و نام خانوادگی ..."
                        />
                        <div class="invalid-feedback">
                          لطفا نام و نام خانوادگی را به درستی وارد کنید.
                        </div>
                        <div class="valid-feedback">کاملا درسته</div>
                        {/* <small id="emailHelp" className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                      </div>
                      <div className="form-group m-4">
                        <input
                          type="text"
                          className="form-control form-control-lg is-invalid"
                          id="InputMobile"
                          placeholder="شماره موبایل ..."
                        />
                        <div class="invalid-feedback">
                          لطفا شماره موبایل را به درستی وارد کنید.
                        </div>
                        <div class="valid-feedback">کاملا درسته</div>
                      </div>
                      <div className="form-group m-4">
                        <input
                          type="text"
                          className="form-control form-control-lg is-valid"
                          id="InputTelephone"
                          placeholder="تلفن ..."
                        />
                        <div class="invalid-feedback">
                          لطفا تلفن را به درستی وارد کنید.
                        </div>
                        <div class="valid-feedback">کاملا درسته</div>
                      </div>
                    </form>
                    <form id="addnewform2">
                      <div className="form-group m-4">
                        <input
                          type="text"
                          className="form-control form-control-lg is-invalid"
                          id="InputMobile2"
                          placeholder="شماره موبایل ..."
                        />
                        <div class="invalid-feedback">
                          لطفا شماره موبایل را به درستی وارد کنید.
                        </div>
                        <div class="valid-feedback">کاملا درسته</div>
                      </div>
                      <div className="form-group m-4">
                        <input
                          type="text"
                          className="form-control form-control-lg is-valid"
                          id="InputTelephone2"
                          placeholder="تلفن ..."
                        />
                        <div class="invalid-feedback">
                          لطفا تلفن را به درستی وارد کنید.
                        </div>
                        <div class="valid-feedback">کاملا درسته</div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer" style={{ direction: "ltr" }}>
                    <button
                      type="button"
                      className="btn btn-info ml-2"
                      data-dismiss="modal"
                    >
                      <i className="fa fa-times" />
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => onStep("addnewform")}
                    >
                      مرحله بعد
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="detailmodal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      جزئیات اشخاص
                    </h5>
                  </div>
                  <div className="modal-body">
                    <p className="list-group">
                      <span className="list-group-item">
                        هویت :{" "}
                        <span style={{ fontWeight: "600" }}>
                          {detailedModal.item.identityType}
                        </span>
                      </span>
                      <span className="list-group-item">
                        نام و نام خانوادگی :{" "}
                        <span style={{ fontWeight: "600" }}>
                          {detailedModal.item.name}
                        </span>
                      </span>

                      <span className="list-group-item">
                        حوزه فعالیت :{" "}
                        <span style={{ fontWeight: "600" }}>
                          {detailedModal.item.type}
                        </span>
                      </span>

                      <span className="list-group-item">
                        شماره موبایل :{" "}
                        <span style={{ fontWeight: "600" }}>
                          <PersianDigit>
                            {detailedModal.item.mobile}
                          </PersianDigit>
                        </span>
                      </span>
                      <span className="list-group-item">
                        <span className="row">
                          <span className="col-6">
                            تلفن :{" "}
                            <span style={{ fontWeight: "600" }}>
                              <PersianDigit>
                                {detailedModal.item.telephone}
                              </PersianDigit>
                            </span>
                          </span>
                          <span className="col-6">
                            داخلی :{" "}
                            <span style={{ fontWeight: "600" }}>
                              <PersianDigit>
                                {detailedModal.item.telExtention}
                              </PersianDigit>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span className="list-group-item">
                        کد پستی :{" "}
                        <span style={{ fontWeight: "600" }}>
                          <PersianDigit>
                            {detailedModal.item.postalcode}
                          </PersianDigit>
                        </span>
                      </span>

                      <span className="list-group-item">
                        استان :{" "}
                        <span style={{ fontWeight: "600" }}>
                          <PersianDigit>
                            {detailedModal.item.state}
                          </PersianDigit>
                        </span>
                      </span>
                      <span className="list-group-item">
                        شهر :{" "}
                        <span style={{ fontWeight: "600" }}>
                          <PersianDigit>{detailedModal.item.city}</PersianDigit>
                        </span>
                      </span>

                      <span className="list-group-item">
                        آدرس :{" "}
                        <span style={{ fontWeight: "600" }}>
                          <PersianDigit>
                            {detailedModal.item.address}
                          </PersianDigit>
                        </span>
                      </span>
                      <span className="list-group-item">
                        اعتبار :{" "}
                        <span style={{ fontWeight: "600" }}>
                          <PersianDigit>
                            {detailedModal.item.transaction}
                          </PersianDigit>
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-info ml-2"
                      data-dismiss="modal"
                    >
                      <i className="fa fa-times" />
                    </button>
                    <button type="button" className="btn btn-dark ml-2">
                      <i className="fa fa-wrench" />
                    </button>
                    <button type="button" className="btn btn-danger ml-2">
                      <i className="fa fa-trash-alt" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ListTable
              showDetailModal={showDetailModal}
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
