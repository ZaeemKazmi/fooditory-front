import React from 'react';
import browse from './browse.jpg'

import "./style.css";
const Browse = () => (
        <div className = "browse-container">
            <div className= "row browse-row justify-content-center align-items-center" style={{backgroundImage: `url(${browse})`}}>
                <div className="col-lg-4 browse-col">
                
                </div>
            </div>    
        </div>
);

export default Browse;