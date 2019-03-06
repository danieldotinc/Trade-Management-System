import React, { Component } from "react";
import { PersianDigit } from "../table/common/persiandigit";

export class BusinessProfile extends Component {
  handleBack = () => {
    this.props.onRoute("/Profiles/Business");
    this.props.history.push("/Profiles/Business");
  };
  render() {
    const { detailedModal, listName } = this.props.state;
    return (
      <React.Fragment>
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h5 className="text-center m-5 be-bold">جزئیات کسب و کارها</h5>
          <div className="row m-2">
            <button className="btn btn-primary m-2" onClick={this.handleBack}>
              بازگشت
            </button>
            <button
              className="btn btn-dark m-2"
              onClick={() =>
                this.props.onEditTableItem(detailedModal.item, listName)
              }
            >
              ویرایش
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                this.props.onDeleteTableItem(detailedModal.item.id, listName);
                this.props.history.push("/Profiles/Business");
              }}
            >
              حذف
            </button>
          </div>
          <p className="list-group m-2">
            <span className="list-group-item">
              هویت :
              <span style={{ fontWeight: "600" }}>
                {detailedModal.item.identityType}
              </span>
            </span>
            <span className="list-group-item">
              نام و نام خانوادگی :
              <span style={{ fontWeight: "600" }}>
                {detailedModal.item.name}
              </span>
            </span>

            <span className="list-group-item">
              نام کسب و کار :
              <span style={{ fontWeight: "600" }}>
                {detailedModal.item.company}
              </span>
            </span>

            <span className="list-group-item">
              حوزه فعالیت :
              <span style={{ fontWeight: "600" }}>
                {detailedModal.item.type}
              </span>
            </span>

            <span className="list-group-item">
              شماره موبایل :
              <span style={{ fontWeight: "600" }}>
                <PersianDigit>{detailedModal.item.mobile}</PersianDigit>
              </span>
            </span>
            <span className="list-group-item">
              <span className="row">
                <span className="col-6">
                  تلفن :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{detailedModal.item.telephone}</PersianDigit>
                  </span>
                </span>
                <span className="col-6">
                  داخلی :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>
                      {detailedModal.item.telExtention}
                    </PersianDigit>
                  </span>
                </span>
              </span>
            </span>
            <span className="list-group-item">
              کد پستی :
              <span style={{ fontWeight: "600" }}>
                <PersianDigit>{detailedModal.item.postalCode}</PersianDigit>
              </span>
            </span>

            <span className="list-group-item">
              استان :
              <span style={{ fontWeight: "600" }}>
                <PersianDigit>{detailedModal.item.state}</PersianDigit>
              </span>
            </span>
            <span className="list-group-item">
              شهر :
              <span style={{ fontWeight: "600" }}>
                <PersianDigit>{detailedModal.item.city}</PersianDigit>
              </span>
            </span>

            <span className="list-group-item">
              آدرس :
              <span style={{ fontWeight: "600" }}>
                <PersianDigit>{detailedModal.item.address}</PersianDigit>
              </span>
            </span>
            <span className="list-group-item">
              اعتبار :
              <span style={{ fontWeight: "600" }}>
                <PersianDigit>{detailedModal.item.credit}</PersianDigit>
              </span>
            </span>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default BusinessProfile;
