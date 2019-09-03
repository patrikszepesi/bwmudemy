import React from 'react';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { HouseManageCard } from './HouseManageCard';
import { HouseManageModal } from './HouseManageModal';
import { ToastContainer, toast } from 'react-toastify';

export class HouseManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userHouses: [],
      errors: [],
      isFetching: false
    }

    this.deleteHouse = this.deleteHouse.bind(this);
  }

  componentWillMount() {
    this.setState({isFetching: true});

    actions.getUserHouses().then(
      userHouses => this.setState({userHouses, isFetching: false}),
      errors => this.setState({errors, isFetching: false}))
  }

  renderHouseCards(houses) {
    return houses.map((house, index) =>
     <HouseManageCard modal={<HouseManageModal bookingsH={house.bookingsH}/>}
                       key={index}
                       house={house}
                       houseIndex={index}
                       deleteHouseCb={this.deleteHouse} />);
  }

  deleteHouse(houseId, houseIndex) {
    actions.deleteHouse(houseId).then(
      () => this.deleteHouseFromList(houseIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteHouseFromList(houseIndex) {
    const userHouses = this.state.userHouses.slice();
    userHouses.splice(houseIndex, 1);

    this.setState({userHouses});
  }

  render() {
    const { userHouses, isFetching } = this.state;

    return (
      <section id='userRentals'>
        <ToastContainer />
        <h1 className='page-title'>Általam Oktatott Tantárgyak</h1>
        <div className='row'>
        {this.renderHouseCards(userHouses)}
        </div>
        { !isFetching && userHouses.length === 0 &&
          <div className='alert alert-warning'>
            Jelenleg nem vagy oktató, de kövesd a linket és könnyen lehetsz
            <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Oktató akarok lenni</Link>
          </div>
        }
      </section>
    )
  }
}
