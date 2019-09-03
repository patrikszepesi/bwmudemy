import React from 'react';
import { MapWithGeocode} from 'components/map/GoogleMap';
import { connect } from 'react-redux';

import * as actions from 'actions';

class HouseMap extends React.Component {

  reloadMapFinish() {
    this.props.dispatch(actions.reloadMapFinish());
  }

  render() {
    const { location, map: {isReloading} } = this.props;

    return (
      <MapWithGeocode
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5iaPXbqk3Nkq554Fi_bG9jju4khVlEEI&libraries=geometry,drawing,places"
        type="text/javascript"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `405px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={() => this.reloadMapFinish()}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    map: state.map
  }
}

export default connect(mapStateToProps)(HouseMap);
