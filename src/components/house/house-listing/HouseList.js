import React from 'react';
import { HouseCard } from './HouseCard';

export class HouseList extends React.Component {

  renderHouses() {
    return this.props.houses.map((house, index) => {
      return (
          <HouseCard key={index}
                      colNum='col-md-3 col-xs-6'
                      house={house}/>
        )
    });
  }
  render() {
    return (
      <div className="row">
        {this.renderHouses()}
      </div>
    )
  }
}
