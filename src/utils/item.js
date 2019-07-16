const axios = require('axios');

export const getItem = (authToken, sellerId) => {
    return axios
        .get('http://localhost:8080/items/'+sellerId, { headers: { 'Authorization':  authToken } })
        .then(response => {
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

export const updateItem = (authToken, itemId, data) => {
    return axios
        .patch('http://localhost:8080/items/'+itemId, data, { headers: { 'Authorization':  authToken } })
        .then(response => {
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}