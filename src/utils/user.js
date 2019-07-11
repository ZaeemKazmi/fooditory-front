const axios = require('axios');

export const getUsername = (userId) => {
    return axios
        .get('http://localhost:8080/username/'+userId).then(response => {
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}