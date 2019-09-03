import React from 'react';
import RentalCreateForm from './RentalCreateForm';
import { Redirect } from 'react-router-dom';
//

import * as actions from 'actions';

export class RentalCreate extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }

    this.rentalCateogies = ['Egyetemi Tanár', 'Főiskolai Tanár','Középiskolai Tanár','Phd Hallgató', 'Teljes Állásban dolgozó','Gyakornok','Egyetemi Demonstrátor','Harmadéves Hallgató','Másodéves Hallgató','Elsőéves Hallgató','Középiskolai Diák','Egyéb'];

    this.createRental = this.createRental.bind(this);
  }

  createRental(rentalData) {

    actions.createRental(rentalData).then(
      (rental) => this.setState({redirect: true}),
      (errors) => this.setState({errors}))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/rentals'}}/>
    }

    return (

      <section id='newRental'>
        <div className='bwm-form'>
          <div className='row'>

          <div className='col-md-6 ml-auto'>
            <div className='image-container'>


              <img src={process.env.PUBLIC_URL + '/img/3.png'} alt=''/>
                <h1 className='page-title'>Legyél te is Oktató</h1>
            
                <h6>Ügyelj arra, hogy a tantárgyad nevét pontosan írd ki pl.(Opkut helyett Írd, hogy Operációkutatás)</h6>
                <div className='col-md-15'>


                  <RentalCreateForm submitCb={this.createRental}
                                    options={this.rentalCateogies}

                                    errors={this.state.errors}/>
                </div>

            </div>
          </div>

            <div className='col-md-6 ml-auto'>
              <div className='image-container'>




              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
