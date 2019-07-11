import React from 'react';
import io from "socket.io-client";
import { isAuthenticated } from '../auth';

export const CTX = React.createContext();

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

const initialState = {
    abc: [],
    general: [
        { from: "use1", msg: "hi" },
        { from: "use2", msg: "hello" },
        { from: "use3", msg: "I’d like you to…" }
    ],
    topic2: [
        { from: "use5", msg: "Are you sure…?" },
        { from: "use2", msg: "I cannot wait to…" },
        { from: "use3", msg: "I dare say…" }
    ]
};
const reducer = (state, action) => {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return {
                ...state,
                [topic]: [...state[topic], { from, msg }]
            };
        default:
            return state;
    }
};



let socket;

const sendChatAction = (value) => {
    socket.emit('private_message', value, (error) => {
        if(!error){
            initialState.push(JSON.stringify(value).item);
        }
    });

}
//const user = "user" + Math.random().toFixed(2) * 100

// function sendMessageAction(value) {
//     socket.emit("chat message", value);
// }
const loggedInUser = isAuthenticated();
// console.log(loggedInUser);

const Store = props => {
    //  const [allCharts, dispatch] = React.useReducer(reducer, initialState);

    const [allChats, dispatch] = React.useReducer(reducer, initialState);

    if (!socket) {
        socket = io('http://localhost:8080');
        // console.log(loggedInUser + "IN");
        socket.on(loggedInUser.user._id.toString(), (msg) => {
            // parsedData = JSON.stringify(data)
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
        })
    }
    // console.log(loggedInUser + "OUT");


    return (
        //    <ctx.Provider value={{ allCharts, sendMessageAction, user }}>
        <CTX.Provider value={{ allChats, sendChatAction }}>
            {props.children}
        </CTX.Provider>
    );
};
export default Store;