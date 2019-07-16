import React from 'react';

import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';

const Offers = () => (
        <div className = "container center-content">
            <div className= "row home-row justify-content-center">
                
                <div className="col-lg-8 main-col">
                    <h3 className="tittle-desc">Current offers in Olympic Village</h3>

                    <div className="container offer-cards">
                        <div className="row">

                            <div class="col-md-6">
                                <div class="card offer-card">
                                    <img class="card-img-top" src={food1} />
                                    <div class="card-body">
                                        <p class="card-text">
                                        <table class="table offer-details table-sm table-borderless">
                                            {/* <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <div className='col=border'></div>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                <tr>
                                                    <td scope="row">Mikayil Murad</td>
                                                    <td>price: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">starts</td>
                                                    <td>cusine: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row"># reviews</td>
                                                    <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="msg-btn btn-sm">Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card offer-card">
                                    <img class="card-img-top" src={food2} />
                                    <div class="card-body">
                                    <p class="card-text">
                                        <table class="table offer-details table-sm table-borderless">
                                            {/* <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <div className='col=border'></div>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                <tr>
                                                    <td scope="row">Mikayil Murad</td>
                                                    <td>price: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">starts</td>
                                                    <td>cusine: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row"># reviews</td>
                                                    <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="msg-btn btn-sm">Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card offer-card">
                                    <img class="card-img-top" src={food3} />
                                    <div class="card-body">
                                    <p class="card-text">
                                        <table class="table offer-details table-sm table-borderless">
                                            {/* <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <div className='col=border'></div>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                <tr>
                                                    <td scope="row">Mikayil Murad</td>
                                                    <td>price: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">starts</td>
                                                    <td>cusine: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row"># reviews</td>
                                                    <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="msg-btn btn-sm">Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card offer-card">
                                    <img class="card-img-top" src={food4} />
                                    <div class="card-body">
                                    <p class="card-text">
                                        <table class="table offer-details table-sm table-borderless">
                                            {/* <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <div className='col=border'></div>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                <tr>
                                                    <td scope="row">Mikayil Murad</td>
                                                    <td>price: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">starts</td>
                                                    <td>cusine: </td>
                                                </tr>
                                                <tr>
                                                    <td scope="row"># reviews</td>
                                                    <td>ingredients: <a className='ing-detail' href='#' >details</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="msg-btn btn-sm">Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                                                        

                        </div>
                    </div>
                </div>

                <div className="col-lg-3 profile-col">
                    <h3 className="tittle-desc text-center">Other Accommodations in Central Campus</h3>

                    <div className="container offer-cards">
                        <div className="row">

                            <div class="card acc-card" >
                                <div class="card-body">
                                    <h5 class="card-title">Adalbertstraße</h5>
                                        <p class="card-text">Adalbertstraße 41 <br/> 80799 Munich <br/><br/> U3/U6 Universität <br/> Tram 27 Nordendstraße.</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="acc-btn btn-sm">show offers</button>
                                        </div>
                                </div>
                            </div>

                            <div class="card acc-card" >
                                <div class="card-body">
                                    <h5 class="card-title">Biedersteiner Straße</h5>
                                        <p class="card-text">Adalbertstraße 41 <br/> 80799 Munich <br/><br/> U6 Dietlindenstraße <br/> Tram 27 Nordendstraße.</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="acc-btn btn-sm">show offers</button>
                                        </div>
                                </div>
                            </div>

                            <div class="card acc-card" >
                                <div class="card-body">
                                    <h5 class="card-title">Türkenstraße</h5>
                                        <p class="card-text">Türkenstraße 58 <br/> 80779 Munich <br/><br/> U3/U6 Universität </p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button type="button" class="acc-btn btn-sm">show offers</button>
                                        </div>
                                </div>
                            </div>                                                     

                        </div>
                    </div>    
                </div>

            </div>    
        </div>
);

export default Offers;