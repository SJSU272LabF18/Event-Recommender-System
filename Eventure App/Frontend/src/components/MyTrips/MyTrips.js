import React, { Component } from "react";
import NavBarBlue from "../NavBarBlue/NavBarBlue";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getmytrips } from "../../actions";
import _ from "lodash";
import "./MyTrips.css";

//create the sidebar Component
class MyTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsdata: [],
      current: 1,
      itemsPerPage: 5,
      activePage: 1
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  async componentDidMount() {
    await this.props.getmytrips();
    /*  axios.get('http://52.9.107.69:3001/getmytrips/')
                .then(response => { */
    this.setState({
      tripsdata: this.state.tripsdata.concat(this.props.mytrips)
    });
    /* });  */
  }

  handleSearch = e => {
    if (e.target.value) {
      let filteredresult = _.filter(this.state.tripsdata, trip =>
        trip.headline.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log("Filtered result " + JSON.stringify(filteredresult));
      this.setState({
        tripsdata: filteredresult
      });
    } else {
      this.setState({
        tripsdata: this.props.mytrips
      });
    }
  };

  handleSearchStartDate = e => {
    if (e.target.value) {
      let filteredresult = _.filter(
        this.state.tripsdata,
        trip => trip.bookedstartdate == e.target.value
      );
      console.log("Filtered result " + JSON.stringify(filteredresult));
      this.setState({
        tripsdata: filteredresult
      });
    } else {
      this.setState({
        tripsdata: this.props.mytrips
      });
    }
  };

  handleSearchEndDate = e => {
    if (e.target.value) {
      let filteredresult = _.filter(
        this.state.tripsdata,
        trip => trip.bookedenddate == e.target.value
      );
      console.log("Filtered result " + JSON.stringify(filteredresult));
      this.setState({
        tripsdata: filteredresult
      });
    } else {
      this.setState({
        tripsdata: this.props.mytrips
      });
    }
  };

  clickHandler(event) {
    this.setState({
      current: Number(event.target.id)
    });
  }

  render() {
    const { current, itemsPerPage } = this.state;
    const indexOfLastPage = current * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const paginatedtrips = this.state.tripsdata.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
    console.log("Number of properties : " + this.state.tripsdata.length);

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.tripsdata.length / itemsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const showPageNumbers = pageNumbers.map(number => {
      return (
        <li
          class="page-item active"
          key={number}
          id={number}
          onClick={this.clickHandler}
          className="page-item nums"
        >
          {number}
        </li>
      );
    });

    let details = paginatedtrips.map((data, i) => {
      return (
        <table>
          <tbody class="tableprops">
            <tr key={i}>
              <div class="container list-props">
                <div>
                  <td>
                    <h2>{data.headline}</h2>
                  </td>
                </div>
                <div>
                  <td>Location : {data.location}</td>
                </div>
                <div>
                  <td>Trip start : {data.bookedstartdate}</td>
                </div>
                <div>
                  <td>Trip end :{data.bookedenddate}</td>
                </div>
                <div>
                  <td>Price : {data.price}</td>
                </div>
                <div>
                  <td>Property owner : {data.oemailid}</td>
                </div>
              </div>
              <br />
            </tr>
          </tbody>
        </table>
      );
    });

    return (
      <div>
        <NavBarBlue />

        {/* <div class="input-group md-form form-sm form-1 pl-0"> */}
        {/* <div class="input-group-prepend">
                <span class="input-group-text cyan lighten-2" id="basic-text1"><i class="fa fa-search text-white"
                    aria-hidden="true"></i></span>
            </div> */}
        <div>
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <label>Filter your trip </label>
          <input
            class="form-control2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleSearch}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <label>Filter start date </label>
          <input
            class="form-control2"
            type="date"
            label="Filter Start Date"
            aria-label="Search"
            onChange={this.handleSearchStartDate}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <label>Filter end date </label>
          <input
            class="form-control2"
            type="date"
            label="Filter End Date"
            aria-label="Search"
            onChange={this.handleSearchEndDate}
          />
          {/*  <input class="form-control" type="text" placeholder="Search" aria-label="Search" onChange = {this.handleSearch}/>
            <input class="form-control" type="date" placeholder="Search" aria-label="Search" onChange = {this.handleSearch}/> */}
          {/* </div> */}
        </div>

        <div class="container">
          <h2>List of Trips</h2>

          <div className="flex-container-mytrips">{details}</div>

          <nav aria-label="...">
            <ul class="pagination">{showPageNumbers}</ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mytrips: state.mytripsreducer.mytrips
  };
};

export default connect(
  mapStateToProps,
  { getmytrips }
)(MyTrips);
