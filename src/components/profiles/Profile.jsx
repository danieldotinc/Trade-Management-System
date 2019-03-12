import React, { Component } from "react";
import { PersianDigit } from "../table/common/persiandigit";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class Profile extends Component {
  handleBack = () => {
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
  };
  render() {
    const { detailedModal, listName } = this.props.state;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={this.props.classes.cardTitleWhite}>جزئیات شخص</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              جزئیات {detailedModal.item.name}
            </p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row m-2">
                <button
                  className="btn btn-primary m-2"
                  onClick={this.handleBack}
                >
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
                    this.props.onDeleteTableItem(detailedModal.item, listName);
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
                        <PersianDigit>
                          {detailedModal.item.telephone}
                        </PersianDigit>
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
            </React.Fragment>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(rtlStyle)(Profile);
