import React from 'react';
import { HouseList } from './HouseList';
import { connect } from 'react-redux';

import { toUpperCase } from 'helpers';
import * as actions from 'actions';


class HouseSearchListing extends React.Component {

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
      this.searchHousesByCity();
    }
  }

  searchHousesByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({searchedCity});

    this.props.dispatch(actions.fetchHouses(searchedCity));
  }

  renderTitle() {
    const { errors, data } = this.props.houses;
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
        <HouseList houses={this.props.houses.data} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    houses: state.houses
  }
}

export default connect(mapStateToProps)(HouseSearchListing)
