import React from "react";
import offer from './offer.png';
import buy from './buy.png';

import "./Home.css";
import OfferFood from "./OfferFood";
import { Link, withRouter } from "react-router-dom";

const Home = () => (
  <div className="home-container">
    <div className="row App__Aside">
      <div className="col-md-6 half_Page" style={{backgroundImage: `url(${offer})`}}>
        {" "}
        <div className="row landing justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="btn">
              <Link className="link offer-btn" to="/offerFood">
                {" "}
                Offer Food
              </Link>
            </div>
            <div>
              <ul className="desctList">
                <br/><li>Share fast and simple</li>
                <br/><li>Avoid wasting food</li>
                <br/><li>Compensate for groceries</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div className="col-md-6 half_Page" style={{backgroundImage: `url(${buy})`}}>
        {" "}
        <div className="row landing justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="btn">
              <Link className="link buy-btn" to="/Browse">
                {" "}
                Buy Food
              </Link>
            </div>
            <div>
              <ul className="desctList">
                <br/><li>Homemade and affordable foods</li>
                <br/><li>Try different cuisines</li>
                <br/><li>Save time and make friends</li>
              </ul>
            </div>
          </div>
        </div>       
      </div>

    </div>
  </div>
);

export default Home;
