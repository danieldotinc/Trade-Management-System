import React, { Component } from "react";
import $ from "jquery";
import uuid from "uuid";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddPerson extends Form {
  state = {
    data: {
      identity: "",
      identityId: "",
      name: "",
      company: "",
      companyId: "",
      officeSector: "",
      officeSectorId: "",
      marketSector: "",
      marketSectorId: "",
      telephone: "",
      telExtention: "",
      mobile: "",
      postalCode: "",
      state: "",
      city: "",
      address: "",
      credit: "",
      explanation: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.handleCleaningForm();

    const emptyData = { ...this.state.data };
    emptyData.identity = this.props.state.identities[0].name;
    emptyData.identityId = this.props.state.identities[0]._id;
    emptyData.marketSector = this.props.state.types[0].name;
    emptyData.marketSectorId = this.props.state.types[0]._id;
    emptyData.officeSector = this.props.state.sectors[0].name;
    emptyData.officeSectorId = this.props.state.sectors[0]._id;

    this.props.state.editForm
      ? this.setState({ data: this.props.state.detailedModal.item })
      : this.setState({ data: emptyData });
  }

  handleBack = () => {
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
  };

  doSubmit = data => {
    this.props.onAddItem(data);
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
    this.handleCleaningForm();
  };

  render() {
    const { pageName, types, identities, sectors } = this.props.state;
    return (
      <React.Fragment>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={this.props.classes.cardTitleWhite}>افزودن شخص</h4>
              <p className={this.props.classes.cardCategoryWhite}>
                افزودن شخص جدید
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleFormSubmission} id="addnewform1">
                <div className="row m-2">
                  {this.renderSubmitBtn("ذخیره")}
                  {this.renderCancelBtn("لغو")}
                </div>
                <div className="row">
                  {this.renderInput("name", "نام و نام خانوادگی", "3", true)}
                  {this.renderSelect("identity", "هویت", identities)}
                  {this.renderSelect("officeSector", "واحد سازمانی", sectors)}
                  {this.renderSelect("marketSector", "حوزه فعالیت", types)}
                  {this.renderInput("company", "نام کسب و کار")}
                  {this.renderInput("mobile", "شماره موبایل", "3", true)}
                  {this.renderInput("telephone", "تلفن")}
                  {this.renderInput("telExtention", "تلفن داخلی")}
                  {this.renderInput("postalCode", "کد پستی")}
                  {this.renderInput("state", "استان")}
                  {this.renderInput("city", "شهر")}
                  {this.renderInput("address", "آدرس", "5", false)}
                  {this.renderInput("credit", "اعتبار")}
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </React.Fragment>
    );
  }
}

export default withStyles(rtlStyle)(AddPerson);
