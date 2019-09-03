import React from 'react';
import { toUpperCase, pretifyDate } from 'helpers';
import { Link } from 'react-router-dom';

export class RentalManageCard extends React.Component {

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

  deleteRental(rentalId, rentalIndex) {
    this.setState({wantDelete: false});

    this.props.deleteRentalCb(rentalId, rentalIndex);
  }


  render() {
    const { rental, modal, rentalIndex/*,bookings*/ } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';
    if(rental.bookings.length!==0){
  alert( 'A(z) ' + rental.city.toUpperCase()+ ' órádra eddig összesen ' + rental.bookings.length + ' foglalás érkezett. Nézd meg őket')}





    return (


    <div className='col-md-4'>
      <div className={`card text-center ${deleteClass}`}>
        <div className='card-block'>
          <h4 className='card-title'>{rental.title} - {toUpperCase(rental.city)}</h4>
          <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Tantárgy Adatlaphoz</Link>
          { rental.bookings && rental.bookings.length > 0 && modal }
        </div>

        <div className='card-footer text-muted'>
          Tantárgy Létrehozásának Dátuma: {pretifyDate(rental.createdAt)}
          { !wantDelete &&
            <React.Fragment>
              <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Törlés </button>
              <Link className='btn btn-warning' to={{pathname: `/rentals/${rental._id}/edit`, state: { isUpdate: true }}}> Tantárgy Szerkesztése </Link>
            </React.Fragment>
          }
          { wantDelete &&
            <div className='delete-menu'>
                Biztosan ki akarod Törölni a Tárgyat(Végleg)?
              <button onClick={() => {this.deleteRental(rental._id, rentalIndex)}} className='btn btn-danger'> Igen </button>
              <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> Nem </button>
            </div>
          }
        </div>
      </div>
    </div>

    )
  }
}
