import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getSettingItems } from "../../actions/settingActions";
import auth from "../../services/authService";

export class Navigation extends Component {
  componentDidMount() {
    this.props.getSettingItems();
  }
  render() {
    const user = auth.getCurrentUser();
    const { onRoute, settings, loading } = this.props;
    if (loading || !settings) return <h1>Loading...</h1>;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Dashboard"
                    onClick={() => onRoute("/Dashboard")}
                  >
                    داشبورد <span className="sr-only">(current)</span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Products"
                    onClick={() => onRoute("/Products")}
                  >
                    محصولات
                  </NavLink>
                </li>

                {(settings[0].personsAccess || user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Profiles/Business"
                      onClick={() => onRoute("/Profiles/Business")}
                    >
                      اشخاص
                    </NavLink>
                  </li>
                )}
                {(settings[0].companiesAccess || user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Profiles/Company"
                      onClick={() => onRoute("/Profiles/Company")}
                    >
                      شرکت ها
                    </NavLink>
                  </li>
                )}
                {(settings[0].tradeAccess || user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Trade"
                      onClick={() => onRoute("/Trade")}
                    >
                      بازرگانی
                    </NavLink>
                  </li>
                )}
                {user.isAdmin && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Settings"
                      onClick={() => onRoute("/Settings")}
                    >
                      تنظیمات
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Logout">
                    خروج از حساب
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">
                    {user.name}
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Register"
                    onClick={() => onRoute("/Register")}
                  >
                    ثبت نام
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Login"
                    onClick={() => onRoute("/Login")}
                  >
                    ورود به حساب کاربری
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
          <NavLink className="navbar-brand mr-auto ml-5" to="/Dashboard">
            مدیریت کسب و کار
          </NavLink>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.setting.settings,
  loading: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems }
)(withRouter(Navigation));
