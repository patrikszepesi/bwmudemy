import React from 'react';
import { Link } from 'react-router-dom';

export default ()=>{



    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">YouTeach</h1>
                <p className="lead">
                  {' '}
                  Nem kell tanárnak lenned, hogy taníts!
                </p>
                <p className="lead">
                  {' '}
                    {/*Nincs díj, Nincs költség, csak Csatlakozz és Oktass vagy Keress Oktatót */}
                </p>


                <hr />
                <Link to="/rentals" className="btn btn-lg btn-info mr-2">
                  Tanárok
                </Link>
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                Regisztrálj
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}
