import React from 'react';
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import "@material/react-chips/dist/chips.css";
import { updateItem } from "../utils/item";

import "./Offers.css";
import browse from "./Browse.js";

import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';

import "./OfferFood.css";
const axios = require("axios");

let loggedInUser;




class Offers extends React.Component {

        constructor(props) {

            super(props);
            this.chatRedirect = this.chatRedirect.bind(this);
        
            var self = this;
            this.state = {
              data: [],
              status: null
            };
        
            // console.log('MIO: ' + browse.value);

            axios
              .get("http://localhost:8080/accItems/Stiftsbogen") //isAuthenticated().user.id
              .then(function(response) {
                self.setState({ data: response.data });
              })
              .catch(function(response) {
                //handle error
              });
          }
        
          chatRedirect(e) {
            console.log(this);
            const itemId = this.props._id;
            const itemName = this.props.name;
            const sellerId  = this.props.sellerId;
            const sellerName = this.props.username;
        
            const data = {
              itemId,
              itemName,
              sellerId,
              sellerName
            };
            console.log(data);
        
            this.props.history.push({
              pathname: "/chat",
              newChat: data // your data array of objects
            });
          }

          render() {
            return (
                <div className="offers-background">
                    <div className = "container center-content">
                        <div className= "row home-row justify-content-center">
                            <div className="col main-col">
                            <h3 className="tittle-desc">Current offers</h3>
                                <div className="row">

                {this.state.data.map((item, index) => {
                    return (


                            <div class="col-md-6">
                                <div class="offer-card" key={index}>
                                    <img class="card-img-top" src={"http://localhost:8080/" + item.image} />
                                    <div class="card-body">
                                        <p class="card-text">
                                        <table class="offer-details table-sm table-borderless">                                            
                                            <tbody>
                                                <tr>
                                                    <td scope="row">Mikayil Murad</td>
                                                    <td>price: {item.price}</td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">starts</td>
                                                    <td>name: {item.name}</td>
                                                </tr>
                                                <tr>
                                                    <td scope="row"># reviews</td>
                                                    <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="msg-btn" onClick={this.chatRedirect}>Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
  
                    );
                })}
                </div>
                </div>
                </div>
                </div>
                </div>  
              
            );
          }
  }

// const Offers = () => (
//     <div className="offers-background">
//         <div className = "container center-content">
//             <div className= "row home-row justify-content-center">
                
//                 <div className="col-lg-8 main-col">
//                     <h3 className="tittle-desc">Current offers in Olympic Village</h3>

//                     <div className="container offer-cards">
//                         <div className="row">

//                             <div class="col-md-6">
//                                 <div class="offer-card">
//                                     <img class="card-img-top" src={food1} />
//                                     <div class="card-body">
//                                         <p class="card-text">
//                                         <table class="offer-details table-sm table-borderless">
//                                             {/* <thead>
//                                                 <tr>
//                                                     <th scope="col"></th>
//                                                     <div className='col=border'></div>
//                                                     <th scope="col"></th>
//                                                 </tr>
//                                             </thead> */}
//                                             <tbody>
//                                                 <tr>
//                                                     <td scope="row">Mikayil Murad</td>
//                                                     <td>price: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row">starts</td>
//                                                     <td>cusine: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row"># reviews</td>
//                                                     <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         </p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="msg-btn">Message</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div class="col-md-6">
//                                 <div class="offer-card">
//                                     <img class="card-img-top" src={food2} />
//                                     <div class="card-body">
//                                     <p class="card-text">
//                                         <table class="offer-details table-sm table-borderless">
//                                             {/* <thead>
//                                                 <tr>
//                                                     <th scope="col"></th>
//                                                     <div className='col=border'></div>
//                                                     <th scope="col"></th>
//                                                 </tr>
//                                             </thead> */}
//                                             <tbody>
//                                                 <tr>
//                                                     <td scope="row">Mikayil Murad</td>
//                                                     <td>price: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row">starts</td>
//                                                     <td>cusine: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row"># reviews</td>
//                                                     <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         </p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="msg-btn">Message</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div class="col-md-6">
//                                 <div class="offer-card">
//                                     <img class="card-img-top" src={food3} />
//                                     <div class="card-body">
//                                     <p class="card-text">
//                                         <table class="offer-details table-sm table-borderless">
//                                             {/* <thead>
//                                                 <tr>
//                                                     <th scope="col"></th>
//                                                     <div className='col=border'></div>
//                                                     <th scope="col"></th>
//                                                 </tr>
//                                             </thead> */}
//                                             <tbody>
//                                                 <tr>
//                                                     <td scope="row">Mikayil Murad</td>
//                                                     <td>price: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row">starts</td>
//                                                     <td>cusine: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row"># reviews</td>
//                                                     <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         </p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="msg-btn">Message</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div class="col-md-6">
//                                 <div class="offer-card">
//                                     <img class="card-img-top" src={food4} />
//                                     <div class="card-body">
//                                     <p class="card-text">
//                                         <table class="offer-details table-sm table-borderless">
//                                             {/* <thead>
//                                                 <tr>
//                                                     <th scope="col"></th>
//                                                     <div className='col=border'></div>
//                                                     <th scope="col"></th>
//                                                 </tr>
//                                             </thead> */}
//                                             <tbody>
//                                                 <tr>
//                                                     <td scope="row">Mikayil Murad</td>
//                                                     <td>price: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row">starts</td>
//                                                     <td>cusine: </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td scope="row"># reviews</td>
//                                                     <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         </p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="msg-btn">Message</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>                                                        

//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-lg-3 profile-col">
//                     <h3 className="tittle-desc text-center">Other Accommodations in Central Campus</h3>

//                     <div className="container offer-cards">
//                         <div className="row">

//                             <div class="acc-card" >
//                                 <div class="card-body">
//                                     <h5 class="card-title">Adalbertstraße</h5>
//                                         <p class="card-text">Adalbertstraße 41 <br/> 80799 Munich <br/><br/> U3/U6 Universität <br/> Tram 27 Nordendstraße.</p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="acc-btn">show offers</button>
//                                         </div>
//                                 </div>
//                             </div>

//                             <div class="acc-card" >
//                                 <div class="card-body">
//                                     <h5 class="card-title">Biedersteiner Straße</h5>
//                                         <p class="card-text">Adalbertstraße 41 <br/> 80799 Munich <br/><br/> U6 Dietlindenstraße <br/> Tram 27 Nordendstraße.</p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="acc-btn">show offers</button>
//                                         </div>
//                                 </div>
//                             </div>

//                             <div class="acc-card" >
//                                 <div class="card-body">
//                                     <h5 class="card-title">Türkenstraße</h5>
//                                         <p class="card-text">Türkenstraße 58 <br/> 80779 Munich <br/><br/> U3/U6 Universität </p>
//                                         <div class="d-flex justify-content-center align-items-center">
//                                             <button type="button" class="acc-btn">show offers</button>
//                                         </div>
//                                 </div>
//                             </div>                                                     

//                         </div>
//                     </div>    
//                 </div>
//             </div>
//             </div>    
//         </div>
// );

export default Offers;