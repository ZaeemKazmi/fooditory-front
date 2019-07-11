const axios = require('axios');

export const loadUserConversations = authToken => {
    return axios
        .get('http://localhost:8080/chats', { params:{}, headers: { 'Authorization':  authToken } })
        .then(response => {
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}