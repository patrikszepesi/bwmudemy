import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from 'components/rental/RentalSearchInput';

class Header extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <a className='nav-item nav-link clickable' onClick={this.handleLogout}>Kijelentkezés</a>
    }

    return (
        <React.Fragment>
          <Link className='nav-item nav-link' to='/login'>Bejelentkezés <span className='sr-only'>(current)</span></Link>
          <Link className='nav-item nav-link' to='/register'>Regisztráció</Link>
          <Link className='nav-item nav-link' to='/about'>Rólunk</Link>
        </React.Fragment>
      )
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <React.Fragment>
          <Link className="nav-item nav-link" to="/rentals/new">Legyél Oktató</Link>
          <Link className="nav-item nav-link" to="/rentals/manage">Tantárgyaid </Link>
          <Link className="nav-item nav-link" to="/bookings/manage">Foglalásaid</Link>
          <Link className="nav-item nav-link" to="/help">Segítség</Link>
        </React.Fragment>
      )
    }
  }

  render() {
    const {username, isAuth} = this.props.auth;


    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>

          <Link className='navbar-brand' to='/'>YouTeach


          </Link>
          <RentalSearchInput />
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
              { isAuth &&
                <a className='nav-item nav-link'>{username}</a>
              }
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Header));








/*import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from 'components/rental/RentalSearchInput';

class Header extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/rentals');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <a className='nav-item nav-link clickable' onClick={this.handleLogout}>Kijelentkezés</a>
    }

    return (
        <React.Fragment>
          <Link className='nav-item nav-link' to='/login'>Bejelentkezés <span className='sr-only'>(current)</span></Link>
          <Link className='nav-item nav-link' to='/register'>Regisztráció</Link>
          <Link className='nav-item nav-link' to='/about'>Rólunk</Link>
        </React.Fragment>
      )
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Profil Kezelése
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/rentals/new">Legyél Oktató</Link>
            <Link className="dropdown-item" to="/rentals/manage">Tantárgyaid és a Foglalások</Link>
            <Link className="dropdown-item" to="/bookings/manage">Általad Foglalt Oktató</Link>
            <Link className="dropdown-item" to="/help">Segítség</Link>
          </div>
        </div>
      )
    }
  }

  render() {
    const {username, isAuth} = this.props.auth;


    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/rentals'>TeachMe

          </Link>
          <RentalSearchInput />
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
              { isAuth &&
                <a className='nav-item nav-link'>{username}</a>
              }
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Header));*/
