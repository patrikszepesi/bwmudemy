import React from 'react';
import { HouseList } from './HouseList';
import { connect } from 'react-redux';

import * as actions from 'actions';


class HouseListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchHouses());
  }

  render() {
    return (
      <section id="rentalListing">

        <h1 className="page-title">Nem kell tanárnak lenned, hogy taníts!</h1>
          <h5>Nincs díj, Nincs költség, csak Csatlakozz és Oktass vagy Keress Oktatót     </h5>

          <hr/>
        <HouseList houses={this.props.houses} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    houses: state.houses.data
  }
}

export default connect(mapStateToProps)(HouseListing)
