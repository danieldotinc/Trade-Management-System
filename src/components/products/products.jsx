import React, { Component } from "react";
import FullList from "../table/fullList";
import PersianDigit from "../table/common/persiandigit";
import $ from "jquery";
import { types } from "util";
import { Link } from "react-router-dom";
import uuid from "uuid";

export class Products extends Component {
  render() {
    const {
      state,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      onPageChange,
      onGenreChange,
      onSort,
      onStep,
      onRoute,
      onNewForm,
      onShowDetailModal,
      onFormChange,
      onFormBack
    } = this.props;
    const { detailedModal } = this.props.state;
    return (
      <React.Fragment>
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h5 className="text-center m-3 be-bold">اطلاعات محصولات</h5>

          <div className="row m-2">
            <Link
              to="/AddProduct"
              className="btn btn-primary m-2"
              onClick={() => onNewForm()}
            >
              افزودن
            </Link>
          </div>

          <FullList
            state={state}
            onDeleteTableItem={onDeleteTableItem}
            onEditTableItem={onEditTableItem}
            onLikeItem={onLikeItem}
            onPageChange={onPageChange}
            onGenreChange={onGenreChange}
            onShowDetailModal={onShowDetailModal}
            onSort={onSort}
            onStep={onStep}
            onRoute={onRoute}
            onNewForm={onNewForm}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
