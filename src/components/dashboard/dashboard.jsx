/*eslint-disable*/
import React from "react";
import { connect } from "react-redux";
import { getProductItems } from "../../actions/productActions";
import { getPersonItems } from "../../actions/personActions";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DataUsage from "@material-ui/icons/DataUsage";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import Button from "../CustomButtons/Button.jsx";
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import Tasks from "../Tasks/Tasks.jsx";
import CustomTabs from "../CustomTabs/CustomTabs.jsx";
import Danger from "../Typography/Danger.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardAvatar from "../Card/CardAvatar.jsx";
import CardIcon from "../Card/CardIcon.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";
import SnackbarContent from "../Snackbar/SnackbarContent.jsx";
import { PersianNum } from "../table/common/persiandigit";
import { BeatLoader } from "react-spinners";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";

import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

import avatar from "../../assets/img/faces/marc.jpg";

let bugs = [
  "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن؟",
  "	نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟",
  "همان حال کار آنها به نوعی وابسته به متن می‌باشد",
  "	آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند"
];
let website = [
  "بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته",
  "اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید؟"
];
let server = [
  "گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی؟",
  "از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی ؟",
  "از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟"
];

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.props.getProductItems();
    this.props.getPersonItems();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, products, loading, persons, loadingPersons } = this.props;
    if (!products || loading || !persons || loadingPersons)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <i className="fa fa-sync" />
                </CardIcon>
                <p className={classes.cardCategory}>فضا مصرف شده</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum("49/50")} <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <i className="fa fa-exclamation-circle ml-2" />
                  </Danger>
                  فضای بیشتری داشته باشید...
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <i className="fa fa-store" />
                </CardIcon>
                <p className={classes.cardCategory}>محصولات</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum(`${products.length}+`)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  ۲۴ ساعت اخیر
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <i className="fa fa-exclamation-circle" />
                </CardIcon>
                <p className={classes.cardCategory}>مشکلات حل شده</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum(75)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  توسط گیت‌هاب
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <i className="fa fa-user" />
                </CardIcon>
                <p className={classes.cardCategory}>اشخاص</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum(`${persons.length}+`)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  هم‌اکنون
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="وظایف:"
              headerColor="info"
              rtlActive
              tabs={[
                {
                  tabName: "باگ‌ها",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                      rtlActive
                    />
                  )
                },
                {
                  tabName: "وبسایت",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                      rtlActive
                    />
                  )
                },
                {
                  tabName: " سرور",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                      rtlActive
                    />
                  )
                }
              ]}
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>اعلان ها</h4>
                <p className={classes.cardCategoryWhite}>
                  يدويا من قبل أصدقائنا من{" "}
                  <a target="_blank" href="https://material-ui-next.com/">
                    واجهة المستخدم المادية
                  </a>{" "}
                  ونصب من قبل{" "}
                  <a target="_blank" href="https://www.creative-tim.com/">
                    الإبداعية تيم
                  </a>
                  . يرجى التحقق من{" "}
                  <a href="#pablo" target="_blank">
                    وثائق كاملة
                  </a>
                  .
                </p>
              </CardHeader>
              <CardBody>
                <SnackbarContent
                  message={
                    'این یک اعلان است که با کلاس color="warning" ایجاد شده است.'
                  }
                  close
                  rtlActive
                  color="warning"
                />
                <SnackbarContent
                  message={
                    'این یک اعلان است که با کلاس color="primary" ایجاد شده است.'
                  }
                  close
                  rtlActive
                  color="primary"
                />
                <SnackbarContent
                  message={"این یک اعلان با دکمه بستن و آیکن است"}
                  close
                  rtlActive
                  color="info"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading,
  persons: state.person.persons,
  loadingPersons: state.person.loadiong
});

export default connect(
  mapStateToProps,
  { getProductItems, getPersonItems }
)(withStyles(rtlStyle)(Dashboard));
