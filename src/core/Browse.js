import React from 'react';
import browse from './browse.jpg'
import Select from 'react-select';

import "./Browse.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

const techCompanies = [
  { label: "Acc1", value: 1 },
  { label: "Acc2", value: 2 },
  { label: "Acc3", value: 3 },
];


const Browse = () => (
        <div className = "container-fluid browse-container">
            <div className= "row browse-row justify-content-center align-items-center" style={{backgroundImage: `url(${browse})`}}>
                <div className="col-lg-6 browse-col aling-center align-middle">

                        <div className="row drop-back row justify-content-center align-items-center">
                            <div className="dropdown col-md-9"><Select options={ techCompanies } /></div>
                            <div className="search col-md-3"><button type="button" class="search-btn">show offers</button></div>
                        </div>
                    
                </div>
            </div>    
        </div>
);

export default Browse;