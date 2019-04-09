import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getCompanyItem,
  addCompanyItem,
  updateCompanyItem
} from "../../actions/companyActions";
import { getMarketSectorItems } from "../../actions/marketSectorActions";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddCompany extends Form {
  state = {
    data: {
      name: "",
      city: "",
      marketSector: "",
      marketSectorId: "",
      telephone1: "",
      telephone2: "",
      address: "",
      postalCode: "",
      explanation: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getMarketSectorItems();
    this.handleCleaningForm();
    this.handleEditForm();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { company, loadingCompany } = nextProps;
      if (loadingCompany || !company) return <h1>Loading...</h1>;
      this.setState({ data: company });
    }
  }

  handlePreparingForm = data => {
    const { marketSectors } = this.props;
    if (!data.marketSectorId) {
      data.marketSector = marketSectors[0].name;
      data.marketSectorId = marketSectors[0]._id;
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
    id && this.props.getCompanyItem(id);
  };

  handleBack = () => {
    const { listName } = this.props.state;
    this.props.onRoute(`/Profiles/${listName}`);
    this.props.history.push(`/Profiles/${listName}`);
  };

  doSubmit = data => {
    const result = this.handlePreparingForm(data);

    this.props.match.params.id
      ? this.props.updateCompanyItem(result)
      : this.props.addCompanyItem(result);

    this.handleBack();
    this.handleCleaningForm();
    this.handleNotify(result.name);
  };

  render() {
    const { marketSectors, loadingMarketSectors } = this.props;
    if (!marketSectors || loadingMarketSectors) return <h1>Loading ...</h1>;

    return (
      <React.Fragment>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={this.props.classes.cardTitleWhite}>افزودن شرکت</h4>
              <p className={this.props.classes.cardCategoryWhite}>
                افزودن شرکت جدید
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleFormSubmission} id="addnewform1">
                <div className="row m-2">
                  {this.renderSubmitBtn("")}
                  {this.renderCancelBtn("لغو")}
                </div>
                <div className="row">
                  {this.renderInput("name", "نام", "3", true)}
                  {this.renderInput("city", "شهر")}
                  {this.renderSelect(
                    "marketSector",
                    "حوزه فعالیت",
                    marketSectors
                  )}
                  {this.renderInput("telephone1", "تلفن 1")}
                  {this.renderInput("telephone2", "تلفن 2")}
                  {this.renderInput("address", "آدرس", "5", false)}
                  {this.renderInput("postalCode", "کد پستی")}
                  {this.renderInput("explanation", "توضیح", "5", false)}
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
  company: state.company.company,
  loadingCompany: state.company.loading,
  marketSectors: state.marketSector.marketSectors,
  loadingMarketSectors: state.marketSector.loading
});

export default connect(
  mapStateToProps,
  {
    addCompanyItem,
    getCompanyItem,
    updateCompanyItem,
    getMarketSectorItems
  }
)(withStyles(rtlStyle)(AddCompany));
