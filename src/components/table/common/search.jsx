import React, { Component } from "react";

export default class Search extends Component {
  state = {};

  handleSearchChange = e => {
    const search = e.target.value;
    this.setState({ search });
  };

  renderSearch = () => {
    return (
      <form className="form-inline m-2">
        <i className="fas fa-search ml-2" aria-hidden="true" />
        <input
          className="form-control ml-3 w-25"
          value={this.state.search}
          name="search"
          type="text"
          placeholder="جستجو..."
          aria-label="Search"
          onChange={this.handleSearchChange}
        />
      </form>
    );
  };
}
