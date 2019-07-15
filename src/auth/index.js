const axios = require("axios");

export const signup = user => {
  return axios
    .post("http://localhost:8080/signup", user)
    .then(response => {
      return response;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const login = user => {
  return axios
    .post("http://localhost:8080/login", user)
    .then(response => {
      return response;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const logout = next => {
  let headers;
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    headers = {
      Authorization: `Bearer ${token}`
    };
    localStorage.removeItem("jwt");
  }
  next();

  return axios
    .post("http://localhost:8080/logout", "", { headers })
    .then(response => {
      console.log("logout", response);
      return response;
    })
    .catch(err => {
      console.error(err.message);
    });
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
