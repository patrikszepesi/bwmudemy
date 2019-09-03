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
            <div className="col-md-6">
              <h1>Kérdések és Hibajelentés</h1>
              <h5> Kérdés vagy Hibajelentés esetén írj <a href= {"mailto: youteach.help@gmail.com "}> nekünk </a></h5>

                <li>Kiből lehet Oktató?</li>
                <span>VÁLASZ: Bárki lehet Oktató. Az Értékelések majd úgyis kiszűrik a rossz Oktatókat</span>
                  <hr/>
                <li>Hol találom az Oktatóhoz foglalt időpontomat?  </li>
                <span>VÁLASZ: Az Oktatóhoz foglalt időpontokat a 'Foglalásaid'-ra kattintva találod</span>
                  <hr/>
                <li>Honnan tudom, hogy valaki Foglalt-e időpontot az Órámra</li>
                <span>VÁLASZ: A 'Tantárgyaid' gombra kattintva tudod megnézni. Amenyiben érkezett foglalás, egy üzenet fog megjelenni az eddigi összes beérkező foglalásról</span>
                  <hr/>
                <li>Miért nem sikerül a kép feltöltés</li>
                <span>VÁLASZ: Sajnos van olyan böngésző aminél többször kell próbálkozni, hogy sikerüljön</span>
                  <hr/>
                <li>Hogyan tudom Értékelni az Oktatómat?</li>
                <span>VÁLASZ: Amenyiben az Oktatód Használja a Gyors-foglalót. Értékelni úgy tudsz, hogy a 'Foglalásaid'-ra kell kattintani és ott a foglalásodnál meg fog jelenni egy 'Oktató Értékelése ' gomb</span>
                  <hr/>
                <li>Miért Használjam a Gyors-foglalót?</li>
                <span>VÁLASZ: A diákok csak úgy tudnak téged értékelni ha használod. És minél több a jó értékelés a profilod alatt annál többen fognak hozzád foglalni</span>
                  <hr/>
                  <li>Hogy tudom szerkeszteni a tantárgyaimat?(pl. órabér változtatása)</li>
                  <span>VÁLASZ: A 'Tantárgyaid'-ra kattintva tudod megnézni az összes tantárgyadat amit tanítasz. Ott a tantárgy szerkesztése gomb segítségével tudod az adataidat módosítani</span>
                  <hr/>




            </div>
                    <div className="col-md-6 ml-auto">

                    <div className="image-container">


                <img src={process.env.PUBLIC_URL + '/img/class6.jpg'} alt=""/>

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

export default connect(mapStateToProps)(About)
