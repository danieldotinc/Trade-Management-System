import React, { Component } from "react";
import FullList from "../table/fullList";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { Link, NavLink } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

export class ListPage extends Component {
  render() {
    const { classes, onNewForm, onRoute, ...rest } = this.props;
    const { addLink, pageName, links } = this.props.state;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>{pageName}</h4>
            <p className={classes.cardCategoryWhite}>
              {links.map(link => {
                return (
                  <NavLink
                    className="btn btn-info m-1"
                    to={link.link}
                    onClick={() => onRoute(link.link)}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </p>
            <div />
          </CardHeader>
          <CardBody>
            <div className="row m-2">
              <Link
                to={addLink}
                className="btn btn-lg btn-info m-2 shadow-lg rounded"
                onClick={() => onNewForm()}
              >
                <i className="fa fa-plus" />
              </Link>
            </div>
            <FullList {...rest} />
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(rtlStyle)(ListPage);
