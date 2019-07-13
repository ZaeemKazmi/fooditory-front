const axios = require('axios');

export const loadConversations = (authToken) => {
    return axios
        .get('http://localhost:8080/conversations', { params:{}, headers: { 'Authorization':  authToken } })
        .then(response => {
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

export const loadActiveChatMessages = (authToken, chatId) => {
    return axios
        .get('http://localhost:8080/messages', { params:{id : chatId}, headers: { 'Authorization':  authToken } })
        .then(response => {
            return response;
        })
        .catch(err => {
            return Promise.reject(err);
        });
}