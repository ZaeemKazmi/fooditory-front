import React from 'react';
import browse from './browse.jpg'
import Select from 'react-select';

import "./Browse.css";

const acc = [
    { label: "Stiftsbogen", value: 1 },
    { label: "Heiglhofstraße", value: 2 },
    { label: "Chiemgaustraße", value: 3 },
];

class Browse extends React.Component{

    constructor(props) {
        super(props);
        this.showOffers = this.showOffers.bind(this);
      }

    state = {
        selectedOption: null,
      }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption.value);
      }

    showOffers(e) {
        this.props.history.push("/offers");
    }

  render() {
    return (
        <div className = "container-fluid browse-container">
            <div className= "row browse-row justify-content-center align-items-center" style={{backgroundImage: `url(${browse})`}}>
                <div className="col-lg-6 browse-col aling-center align-middle">

                        <div className="row drop-back row justify-content-center align-items-center">
                            <div className="dropdown col-md-9">
                                <Select autoFocus={true} value={this.state.value} onChange={this.handleChange} options={ acc } />
                            </div>
                            <div className="search col-md-3">
                                <button type="button" class="search-btn" onClick={this.showOffers}>show offers</button>
                            </div>
                        </div>
                    
                </div>
            </div>    
        </div>
    );
    }



}

// const Browse = () => (
//         <div className = "container-fluid browse-container">
//             <div className= "row browse-row justify-content-center align-items-center" style={{backgroundImage: `url(${browse})`}}>
//                 <div className="col-lg-6 browse-col aling-center align-middle">

//                         <div className="row drop-back row justify-content-center align-items-center">
//                             <div className="dropdown col-md-9"><Select options={ acc } /></div>
//                             <div className="search col-md-3">
//                                 <a href="/Offers" class="search-btn" role="button">show offers</a>
//                                 {/* <button type="button" class="search-btn" onClick="href='/Offers'">show offers</button> */}
//                             </div>
//                         </div>
                    
//                 </div>
//             </div>    
//         </div>
// );

export default Browse;