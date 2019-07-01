import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { signup , isAuthenticated } from '../auth';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            countryOfOrigin: "",
            accommName: "",
            accommStreet: "",
            accommZipcode: "",
            accommCity: "Munich",
            accommCountry: "Germany",
            error: "",
            open: false
        }
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ open: false });
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = event => {
        event.preventDefault();

        const { name, email, password, countryOfOrigin, accommName, accommStreet, accommZipcode, accommCity, accommCountry } = this.state;

        const user = {
            name: name,
            email: email,
            password: password,
            countryOfOrigin: countryOfOrigin,
            accommodation: {
                name: accommName,
                street: accommStreet,
                zipcode: accommZipcode,
                city: accommCity,
                country: accommCountry
            }
        };
        console.log(user);
        signup(user).then(response => {
            console.log(response)
            this.setState({
                name: "",
                email: "",
                password: "",
                countryOfOrigin: "",
                accommName: "",
                accommStreet: "",
                accommZipcode: "",
                accommCity: "Munich",
                accommCountry: "Germany",
                error: "",
                open: true
            });
        }).catch(err => {
            console.log(err.response);
            if (!(JSON.stringify(err.response.data.error).startsWith("{"))) {
                this.setState({ error: err.response.data.error });
            } else {
                this.setState({ error: "Multiple incorrect values, please fix for your errors and then try again!" });
            }
        });
    }



    signupForm = (name, email, password, countryOfOrigin, accommName, accommStreet, accommZipcode, accommCity, accommCountry) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Display Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Country Of Origin</label>
                <input onChange={this.handleChange("countryOfOrigin")}
                    type="text"
                    className="form-control"
                    value={countryOfOrigin}>
                </input>
            </div>

            <h4 className="mt-5 mb-5">Accommodation Details</h4>
            <div className="form-group">
                <label className="text-muted">Building Number</label>
                <input onChange={this.handleChange("accommName")}
                    type="text"
                    className="form-control"
                    value={accommName}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Street</label>
                <input onChange={this.handleChange("accommStreet")}
                    type="text"
                    className="form-control"
                    value={accommStreet}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Zip Code</label>
                <input onChange={this.handleChange("accommZipcode")}
                    type="text"
                    className="form-control"
                    value={accommZipcode}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">City</label>
                <label className="form-control">{accommCity}</label>
            </div>
            <div className="form-group">
                <label className="text-muted">Country</label>
                <label className="form-control">{accommCountry}</label>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Register
            </button>
        </form>
    );

    render() {
        const { name, email, password, countryOfOrigin, accommName, accommStreet, accommZipcode, accommCity, accommCountry, error, open } = this.state;

        if(isAuthenticated()){
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                <div className="alert alert-success" style={{ display: open ? "" : "none" }}>
                    New account is successfully created! Please login.
                </div>

                {this.signupForm(name, email, password, countryOfOrigin, accommName, accommStreet, accommZipcode, accommCity, accommCountry)}
            </div>
        );
    }
}

export default Signup;