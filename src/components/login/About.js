import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class About extends React.Component {

  constructor() {
    super()

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(userData) {
    this.props.dispatch(actions.login(userData));
  }

  render() {


    return (
      <section id="about">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Rólunk</h1>
              <p>Sziasztok!
              Szepesi Patrik vagyok pénzügy számvitel szakos hallgató a Corvinuson. A story röviden annyi, hogy én magam sokszor nem találom meg a közös pontot a tanáraimmal és rengetegszer volt már olyan, hogy egy másik hallgató társam jobban el tudta nekem magyarázni a tananyagot, mint az egyetemi oktatók. Innen jött az ötlet, hogy megtervezzem és elkészítsem a  weboldalt, ahol összegyűjthetem ezen hallgatókat, s összeköthetem őket a magamfajtákkal.Az ötletelésben sokat segített szaktársam Palkó Péter, akinek ambícióit megismerve tudtam, remek partner lenne, ezért is invitáltam a projektbe. Mi ketten alkotjuk a YouTeach csapatát.</p>
            <span>Ha kérdésed van, hogy hogyan működik az oldal akkor regisztrálj és a segítség menüpontban mindent megtalálsz. </span>

            <span>Vagy ha Egyéb kérdésed van akkor kattins  <a href= {"mailto: youteach.help@gmail.com "}> ide. </a></span>


            </div>
            <div className="col-md-7 ml-auto">
              <div className="image-container">

                <img src={process.env.PUBLIC_URL + '/img/About.PNG'} alt=""/>
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

export default connect(mapStateToProps)(About)
