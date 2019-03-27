import React, { Component } from "react";
import { connect } from "react-redux";
import { getPersonItem, deletePersonItem } from "../../actions/personActions";
import { PersianDigit } from "../table/common/persiandigit";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Profile extends Component {
  componentDidMount() {
    const personId = this.props.match.params.id;
    this.props.getPersonItem(personId);
  }

  // handleBack = () => {
  //   this.props.onRoute("/Profiles/" + this.props.state.listName);
  //   this.props.history.push("/Profiles/" + this.props.state.listName);
  // };

  render() {
    // const { user, listName } = this.props.state;
    const { persons: person } = this.props;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={this.props.classes.cardTitleWhite}>جزئیات شخص</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              جزئیات {person.name}
            </p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row m-2">
                <button
                  className="btn btn-lg btn-info m-2 shadow rounded"
                  // onClick={this.handleBack}
                >
                  <i className="fa fa-arrow-right" />
                </button>
                <button
                  className="btn btn-lg btn-dark m-2 shadow rounded"
                  // onClick={() => this.props.onEditTableItem(person, listName)}
                >
                  <i className="fa fa-wrench" />
                </button>
                {/* {user.isAdmin && (
                  <button
                    className="btn btn-lg btn-danger m-2 shadow rounded"
                    // onClick={() => {
                    //   this.props.onDeleteTableItem(person, listName);
                    //   this.props.history.push("/Products");
                    // }}
                  >
                    <i className="fa fa-trash-alt" />
                  </button>
                )} */}
              </div>
              <p className="list-group m-2">
                <span className="list-group-item">
                  هویت :
                  <span style={{ fontWeight: "600" }}>
                    {person.identityType}
                  </span>
                </span>
                <span className="list-group-item">
                  نام و نام خانوادگی :
                  <span style={{ fontWeight: "600" }}>{person.name}</span>
                </span>

                <span className="list-group-item">
                  نام کسب و کار :
                  <span style={{ fontWeight: "600" }}>{person.company}</span>
                </span>

                <span className="list-group-item">
                  حوزه فعالیت :
                  <span style={{ fontWeight: "600" }}>{person.type}</span>
                </span>

                <span className="list-group-item">
                  شماره موبایل :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.mobile}</PersianDigit>
                  </span>
                </span>
                <span className="list-group-item">
                  <span className="row">
                    <span className="col-6">
                      تلفن :
                      <span style={{ fontWeight: "600" }}>
                        <PersianDigit>{person.telephone}</PersianDigit>
                      </span>
                    </span>
                    <span className="col-6">
                      داخلی :
                      <span style={{ fontWeight: "600" }}>
                        <PersianDigit>{person.telExtention}</PersianDigit>
                      </span>
                    </span>
                  </span>
                </span>
                <span className="list-group-item">
                  کد پستی :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.postalCode}</PersianDigit>
                  </span>
                </span>

                <span className="list-group-item">
                  استان :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.state}</PersianDigit>
                  </span>
                </span>
                <span className="list-group-item">
                  شهر :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.city}</PersianDigit>
                  </span>
                </span>

                <span className="list-group-item">
                  آدرس :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.address}</PersianDigit>
                  </span>
                </span>
                <span className="list-group-item">
                  اعتبار :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.credit}</PersianDigit>
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

const mapStateToProps = state => ({
  persons: state.person.persons
});

export default connect(
  mapStateToProps,
  { getPersonItem }
)(withStyles(rtlStyle)(Profile));
