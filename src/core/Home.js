import React from "react";
import "./Home.css";

const Home = () => (
  <div className="row App__Aside">
    <div className="col-md-6 leftSide">
      {" "}
      <div>
        <button className="btn btn-lg text-white fbutton"> Offer food</button>{" "}
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
      <div>
        <button className="btn btn-lg text-white fbutton"> Buy food</button>{" "}
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
