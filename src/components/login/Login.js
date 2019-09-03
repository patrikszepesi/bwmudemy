import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';

class Login extends React.Component {

  constructor() {
    super();

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(userData) {
    this.props.dispatch(actions.login(userData));
  }

  render() {
    const { isAuth, errors } = this.props.auth;
    const { successRegister } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{pathname: '/rentals'}} />
    }

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
          <div className="col-md-10 ml-auto">
            <div className="image-container">



            </div>
          </div>
            <div className="col-md-5">
              <h1>Bejelentkezés</h1>
                <h6>Lépj be és Taníts vagy Keress Oktatót.</h6>
              {
                successRegister &&
                  <div className='alert alert-success'>
                    <p> Sikeres Regsiztráció, Jelentkezz Be </p>
                  </div>
              }
              <LoginForm submitCb={this.loginUser} errors={errors}/>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">

            <img src={process.env.PUBLIC_URL + '/img/3.png'} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login)
