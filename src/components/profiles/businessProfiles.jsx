import React, { Component } from "react";
import FullList from "../table/fullList";
import PersianDigit from "../table/common/persiandigit";
import $ from "jquery";
import { types } from "util";
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
      onNewForm,
      onShowDetailModal,
      onFormChange,
      onFormBack
    } = this.props;
    const { detailedModal } = this.props.state;
    return (
      <React.Fragment>
        <h3 className="text-center m-5">اطلاعات کسب و کارها</h3>
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
          onNewForm={onNewForm}
        />
        <div
          className="modal fade"
          id="addnewperson"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  افزودن شخص
                </h5>
              </div>
              <div className="modal-body">
                <form id="addnewform1" className="row">
                  <div className="form-group m-4 col-5">
                    <label htmlFor="fullNameInput">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="fullNameInput"
                      aria-describedby="emailHelp"
                      name="name"
                      onChange={onFormChange}
                      value={state.addNewForm.name}
                      placeholder="..."
                      required
                    />
                  </div>
                  <div className="form-group m-4 col-5">
                    <label htmlFor="selectInput">حوزه فعالیت</label>
                    <select
                      className="form-control form-control-lg"
                      id="selectInput"
                    >
                      {state.types.map(workType => (
                        <option key={uuid.v4()}>{workType.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group m-4  col-5">
                    <label htmlFor="mobileInput">شماره موبایل</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="mobileInput"
                      name="mobile"
                      onChange={onFormChange}
                      value={state.addNewForm.mobile}
                      placeholder="..."
                      required
                    />
                  </div>
                  <div className="form-group m-4 col-5">
                    <label htmlFor="telephoneInput">تلفن</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="telephoneInput"
                      name="telephone"
                      onChange={onFormChange}
                      value={state.addNewForm.telephone}
                      placeholder="..."
                    />
                  </div>
                </form>
                <form id="addnewform2">
                  <div className="form-group m-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="workTypeInput"
                      placeholder="حوزه فعالیت"
                    />
                  </div>

                  <div className="form-group m-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="InputTelephone2"
                      placeholder="تلفن"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer" style={{ direction: "ltr" }}>
                <button
                  type="button"
                  id="cancelBtn"
                  className="btn btn-secondary ml-2"
                  data-dismiss="modal"
                >
                  لغو
                </button>
                <button
                  type="button"
                  id="prevBtn"
                  className="btn btn-secondary ml-2"
                  onClick={() => onFormBack("addnewform")}
                >
                  مرحله قبل
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
          <div className="modal-dialog modal-lg" role="document">
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
                      <PersianDigit>{detailedModal.item.mobile}</PersianDigit>
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
                      <PersianDigit>{detailedModal.item.state}</PersianDigit>
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
                      <PersianDigit>{detailedModal.item.address}</PersianDigit>
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
      </React.Fragment>
    );
  }
}

export default BusinessProfiles;
