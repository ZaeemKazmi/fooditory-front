import React, { Component } from 'react';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            "name": "",
            "email": "",
            "password": "",
            "countryOfOrigin": "",
            "accommName": "",
            "accommStreet": "",
            "accommZipcode": "",
            "accommCity": "",
            "accommCountry": "",
            "error": ""
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    clickSubmit = event => {
        event.preventDefault();

        const {name, email, password, countryOfOrigin, accommName, accommStreet, accommZipcode} = this.state;

        const user = {
            name : name,
            email : email,
            password : password,
            countryOfOrigin : countryOfOrigin,
            accommodation : {
                name : accommName,
                street : accommStreet,
                zipcode : accommZipcode,
                city : "Munich",
                country : "Germany"
            }
        };
        console.log(user);

        fetch("http://localhost:8080/users", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(user)
        }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
    }

    render() {
        const {name, email, password, countryOfOrigin, accommName, accommStreet, accommZipcode, accommCity, accommCountry} = this.state;
 
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>


                <form>
                    <div className="form-group">
                        <label className="text-muted">Display Name</label>
                        <input
                            onChange={this.handleChange("name")}
                            type="text"
                            className="form-control"
                            value={this.state.name}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")}
                            type="email"
                            className="form-control"
                            value={this.state.email}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")}
                            type="password"
                            className="form-control"
                            value={this.state.password}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Country Of Origin</label>
                        <input onChange={this.handleChange("countryOfOrigin")}
                            type="text"
                            className="form-control"
                            value={this.state.countryOfOrigin}>
                        </input>
                    </div>

                    <h4 className="mt-5 mb-5">Accommodation Details</h4>
                    <div className="form-group">
                        <label className="text-muted">Building Number</label>
                        <input onChange={this.handleChange("accommName")}
                            type="text"
                            className="form-control"
                            value={this.state.accommName}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Street</label>
                        <input onChange={this.handleChange("accommStreet")}
                            type="text"
                            className="form-control"
                            value={this.state.accommStreet}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Zip Code</label>
                        <input onChange={this.handleChange("accommZipcode")}
                            type="text"
                            className="form-control"
                            value={this.state.accommZipcode}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">City</label>
                        <input onChange={this.handleChange("accommCity")}
                            type="text"
                            className="form-control"
                            value={this.state.accommCity}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Country</label>
                        <input onChange={this.handleChange("accommCountry")}
                            type="text"
                            className="form-control"
                            value={this.state.accommCountry}>
                        </input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default Signup;