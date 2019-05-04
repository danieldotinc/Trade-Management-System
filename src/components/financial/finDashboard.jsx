import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";
import { connect } from "react-redux";
import { getAccountItems } from "../../actions/accountActions";
import { Link } from "react-router-dom";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import { BeatLoader } from "react-spinners";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class FinDahsboard extends Component {
  state = {
    treeData: [{ title: "Chicken", children: [{ title: "Egg" }] }]
  };

  componentDidMount() {
    this.props.getAccountItems();
  }

  handleLink = link => {
    this.props.history.push(link);
    this.props.onRoute(link);
  };

  handleShow = item => {
    const state = {};
    console.log(item);
    Object.keys(this.state).map(key => {
      state[key] = false;
    });
    state[item] = true;
    this.setState({ ...state });
  };

  handleShowDetail = item => {
    const details = {};
    Object.keys(this.state.details).map(key => {
      details[key] = false;
    });
    details[item] = true;
    console.log(details);
    this.setState({ details });
  };

  render() {
    // const treeData = [
    //   {
    //     key: "first-level-node-1",
    //     label: "دارائی ها",
    //     nodes: [
    //       {
    //         key: "second-level-node-1",
    //         label: "موجودی نقد و بانک",
    //         nodes: [
    //           {
    //             key: "third-level-node-1",
    //             label: (
    //               <span
    //                 onClick={() => this.handleLink("/Financial/Assets/Funds")}
    //               >
    //                 صندوق
    //               </span>
    //             )
    //           },
    //           {
    //             key: "third-level-node-2",
    //             label: "بانک"
    //           },
    //           {
    //             key: "third-level-node-3",
    //             label: "تنخواه گردان"
    //           }
    //         ]
    //       },
    //       {
    //         key: "second-level-node-2",
    //         label: "اسناد دریافتنی"
    //       },
    //       {
    //         key: "second-level-node-3",
    //         label: "اسناد پرداختنی"
    //       }
    //     ]
    //   },
    //   {
    //     key: "first-level-node-2",
    //     label: "بدهی ها"
    //   },
    //   {
    //     key: "first-level-node-3",
    //     label: "حساب های سود و زیانی"
    //   }
    // ];
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          backgroundColor: color,
          width: "90%"
        }}
      />
    );
    const { accounts, loading, onRoute } = this.props;
    if (!accounts || loading)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );

    const treeData = [];
    let newAccounts = [...accounts];
    newAccounts.map((account, i) => {
      console.log(account.code.toString().length);
      if (account.code.toString().length <= 2)
        treeData.push({
          key: account._id,
          code: account.code,
          label: account.name,
          nodes: []
        });
    });

    console.log(treeData);
    newAccounts.map(account => {
      if (account.code.toString().length == 3) {
        let index = treeData.findIndex(
          x => account.code.toString()[0] === x.code.toString()
        );
        treeData[index] &&
          treeData[index].nodes.push({
            key: account._id,
            label: account.name,
            nodes: []
          });
      }
    });

    console.log(treeData);

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={this.props.classes.cardTitleWhite}>داشبورد مالی</h4>
            <p className={this.props.classes.cardCategoryWhite}>داشبورد مالی</p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row">
                <div className="list-group p-4 text-center col-12">
                  <div className="row d-flex justify-content-center">
                    <Link
                      className={`btn btn-info btn-block btn-lg m-2 col-3 shadow`}
                      to="/Financial/Invoice"
                    >
                      صدور فاکتور جدید
                    </Link>
                    <Link
                      className={`btn btn-info btn-block btn-lg m-2 col-3 shadow`}
                      to="/Financial/AddAccount"
                    >
                      ساخت حساب جدید
                    </Link>
                  </div>

                  <ColoredLine color="black" />
                  <div id="treelist">
                    <TreeMenu data={treeData} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.account.accounts,
  loading: state.account.loading
});

export default connect(
  mapStateToProps,
  { getAccountItems }
)(withStyles(rtlStyle)(FinDahsboard));
