import React from 'react';
import { toUpperCase, pretifyDate } from 'helpers';
import { Link } from 'react-router-dom';

export class HouseManageCard extends React.Component {

  constructor() {
    super();

    this.state = {
      wantDelete: false
    }
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    })
  }

  deleteHouse(houseId, houseIndex) {
    this.setState({wantDelete: false});

    this.props.deleteHouseCb(houseId, houseIndex);
  }


  render() {
    const { house, modal, houseIndex/*,bookings*/ } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';
    if(house.bookings.length!==0){
  alert( 'A(z) ' + house.city.toUpperCase()+ ' órádra eddig összesen ' + house.bookingsH.length + ' foglalás érkezett. Nézd meg őket')}





    return (


    <div className='col-md-4'>
      <div className={`card text-center ${deleteClass}`}>
        <div className='card-block'>
          <h4 className='card-title'>{house.titleH} - {toUpperCase(house.cityH)}</h4>
          <Link className='btn btn-bwm' to={`/rentals/${house._id}`}>Tantárgy Adatlaphoz</Link>
          { house.bookingsH && house.bookingsH.length > 0 && modal }
        </div>

        <div className='card-footer text-muted'>
          Tantárgy Létrehozásának Dátuma: {pretifyDate(house.createdAtH)}
          { !wantDelete &&
            <React.Fragment>
              <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Törlés </button>
              <Link className='btn btn-warning' to={{pathname: `/houses/${house._id}/edit`, state: { isUpdate: true }}}> Tantárgy Szerkesztése </Link>
            </React.Fragment>
          }
          { wantDelete &&
            <div className='delete-menu'>
                Biztosan ki akarod Törölni a Tárgyat(Végleg)?
              <button onClick={() => {this.deleteRental(house._id, houseIndex)}} className='btn btn-danger'> Igen </button>
              <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> Nem </button>
            </div>
          }
        </div>
      </div>
    </div>

    )
  }
}
