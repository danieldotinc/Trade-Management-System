import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getPersonItem,
  addPersonItem,
  updatePersonItem
} from "../../actions/personActions";
import { getIdentityItems } from "../../actions/identityActions";
import { getMarketSectorItems } from "../../actions/marketSectorActions";
import { getOfficeSectorItems } from "../../actions/officeSectorActions";
import { getCompanyItems } from "../../actions/companyActions";
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
    this.props.getIdentityItems();
    this.props.getCompanyItems();
    this.props.getMarketSectorItems();
    this.props.getOfficeSectorItems();
    this.handleCleaningForm();
    this.handleEditForm();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { person, loadingPerson } = nextProps;
      if (loadingPerson || !person) return <h1>Loading...</h1>;
      this.setState({ data: person });
    }
  }

  handlePreparingForm = data => {
    const { identities, companies, marketSectors, officeSectors } = this.props;

    if (!data.identityId) {
      data.identity = identities[0].name;
      data.identityId = identities[0]._id;
    }
    if (!data.companyId) {
      data.company = companies[0].name;
      data.companyId = companies[0]._id;
    }
    if (!data.marketSectorId) {
      data.marketSector = marketSectors[0].name;
      data.marketSectorId = marketSectors[0]._id;
    }
    if (!data.officeSectorId) {
      data.officeSector = officeSectors[0].name;
      data.officeSectorId = officeSectors[0]._id;
    }

    return data;
  };

  handleNotify = name => {
    let msg = "";
    this.props.match.params.id
      ? (msg = " با موفقیت به روزرسانی شد.")
      : (msg = " با موفقیت اضافه شد.");
    toast.info(name + msg);
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getPersonItem(id);
  };

  handleBack = () => {
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
  };

  doSubmit = data => {
    const result = this.handlePreparingForm(data);

    this.props.match.params.id
      ? this.props.updatePersonItem(result)
      : this.props.addPersonItem(result);

    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
    this.handleCleaningForm();
    this.handleNotify(result.name);
  };

  render() {
    const {
      identities,
      companies,
      marketSectors,
      officeSectors,
      loadingCompanies,
      loadingIdentities,
      loadingMarketSectors,
      loadingOfficeSectors
    } = this.props;
    if (
      !identities ||
      !companies ||
      !marketSectors ||
      !officeSectors ||
      loadingCompanies ||
      loadingIdentities ||
      loadingMarketSectors ||
      loadingOfficeSectors
    )
      return <h1>Loading ...</h1>;

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
                  {this.renderSubmitBtn("")}
                  {this.renderCancelBtn("لغو")}
                </div>
                <div className="row">
                  {this.renderInput("name", "نام و نام خانوادگی", "3", true)}
                  {this.renderSelect("identity", "هویت", identities)}
                  {this.renderSelect(
                    "officeSector",
                    "واحد سازمانی",
                    officeSectors
                  )}
                  {this.renderSelect(
                    "marketSector",
                    "حوزه فعالیت",
                    marketSectors
                  )}
                  {this.renderSelect("company", "نام کسب و کار", companies)}
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

const mapStateToProps = state => ({
  person: state.person.person,
  loadingPerson: state.person.loading,
  companies: state.company.companies,
  loadingCompanies: state.company.loading,
  identities: state.identity.identities,
  loadingIdentities: state.identity.loading,
  marketSectors: state.marketSector.marketSectors,
  loadingMarketSectors: state.marketSector.loading,
  officeSectors: state.officeSector.officeSectors,
  loadingOfficeSectors: state.officeSector.loading
});

export default connect(
  mapStateToProps,
  {
    addPersonItem,
    getPersonItem,
    updatePersonItem,
    getCompanyItems,
    getIdentityItems,
    getMarketSectorItems,
    getOfficeSectorItems
  }
)(withStyles(rtlStyle)(AddPerson));
