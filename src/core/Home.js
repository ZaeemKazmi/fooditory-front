import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="row App__Aside">
    <div className="col-md-6 leftSide">
      {" "}
      <div className="box">
        <Link className="link" to="/offerFood">
          {" "}
          Offer Food
        </Link>
      </div>
      <div>
        <ul className="rightList">
          <li>Share fast and simple</li>
          <li>Avoid wasting food</li>
          <li>Compensate for groceries</li>
        </ul>
      </div>
    </div>
    <div className="col-md-6 rightSide">
      {" "}
      <div className="box">
        <Link className="link" to="/">
          {" "}
          Buy Food
        </Link>
      </div>
      <div>
        <ul className="leftList">
          <li>Homemade and affordable foods</li>
          <li>Try different cuisines</li>
          <li>Save time and make friends</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Home;
