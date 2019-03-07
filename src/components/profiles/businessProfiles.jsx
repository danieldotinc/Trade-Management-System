import React, { Component } from "react";
import FullList from "../table/fullList";
import PersianDigit from "../table/common/persiandigit";
import $ from "jquery";
import { types } from "util";
import { Link } from "react-router-dom";
import uuid from "uuid";

export class BusinessProfiles extends Component {
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
          <h5 className="text-center m-5 be-bold">اطلاعات کسب و کارها</h5>

          <Link to="/Profiles/AddBusinessPerson" className="m-2">
            <button
              className="btn btn-primary m-2"
              style={{ float: "right" }}
              onClick={() => onNewForm()}
            >
              افزودن
            </button>
          </Link>
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

export default BusinessProfiles;
