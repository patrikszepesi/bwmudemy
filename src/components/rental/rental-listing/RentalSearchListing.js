import React from 'react';
import { RentalList } from './RentalList';
import { connect } from 'react-redux';

import { toUpperCase } from 'helpers';
import * as actions from 'actions';


class RentalSearchListing extends React.Component {

  constructor() {
    super();

    this.state = {
      searchedCity: ''
    }
  }

  componentWillMount() {
    this.searchRentalsByCity();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalsByCity();
    }
  }

  searchRentalsByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({searchedCity});

    this.props.dispatch(actions.fetchRentals(searchedCity));
  }

  renderTitle() {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;
    let title ='';

    if (errors.length > 0) {
      title = `Jelenleg még nincs ${toUpperCase(searchedCity)} Oktatónk`
    }

    if(data.length > 0) {
      title = `Az általad keresett ${toUpperCase(searchedCity)} Oktatók`;
    }


    return <h1 className="page-title">{title} </h1>
  }

  render() {
    return (
      <section id="rentalListing">
        {this.renderTitle()}
        <RentalList rentals={this.props.rentals.data} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals
  }
}

export default connect(mapStateToProps)(RentalSearchListing)
