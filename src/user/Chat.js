import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";
import classes from "./Chat.css";
import Style from 'style-it';
// import update from 'immutability-helper';

import { isAuthenticated } from '../auth';
import { loadConversations } from '../utils/chat';
import { getUsername } from '../utils/user';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
let socket;
let loggedInUser;
const clonedeep = require('lodash.clonedeep')


class Chat extends Component {
    constructor() {
        super()
        this.state = {
            textValue: '',
            chats: [],
            activeChat: "",
            error: ""
        }
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    handleChatChange = (event, index) => {
        this.setState({ activeChat: index });
    }

    filterChat = (array, id) => {
        let newArray = clonedeep(array);
        for (var i = 0; i < newArray.length; i++) {
            if (Object.keys(newArray[i])[0] === id) {
                return newArray[i][id].messages;
            }
        }
        return [];
    }

    getActiveChatSellerInfo = () => {
        let i;
        for (i in (this.state.chats)) {
            if (Object.keys(this.state.chats[i])[0] === this.state.activeChat) {
                return Object.values(this.state.chats[i])[0];
            }
        }
        return [];
    }

    getSenderName = (array, chatId, personId) => {
        let newArray = clonedeep(array);
        for (var i = 0; i < newArray.length; i++) {
            if (Object.keys(newArray[i])[0] === chatId) {
                if (newArray[i][chatId]["sellerId"] === personId)
                    return newArray[i][chatId].sellerName
                else return newArray[i][chatId].buyerName;
            }
        }
        return "";
    }

    pushToAry = (name, val) => {
        let obj = {};
        obj[name] = val;
        return obj;
    }

    checkIfAlreadyMessged(chatId) {
        let i;
        for (i in (this.state.chats)) {
            if (Object.keys(this.state.chats[i])[0] === chatId) {
                return true;
            }
        }
        return false;
    }

    getChatIndexInState(chatId) {
        let i;
        for (i in (this.state.chats)) {
            if (Object.keys(this.state.chats[i])[0] === chatId) {
                return i;
            }
        }
        return -1;
    }

    getActiveChatInfo = () => {
        let i;
        for (i in (this.state.chats)) {
            if (Object.keys(this.state.chats[i])[0] === this.state.activeChat) {
                return Object.values(this.state.chats[i])[0]["itemName"] + " by " + Object.values(this.state.chats[i])[0]["sellerName"];
            }
        }
        return null;
    }

    getConversation = (chatId) => {
        let i;
        for (i in (this.state.chats)) {
            if (Object.keys(this.state.chats[i])[0] === chatId) {
                return Object.values(this.state.chats[i])[0];
            }
        }
        return null;
    }

    getMessges = (chatId) => {
        let i;
        for (i in (this.state.chats)) {
            if (Object.keys(this.state.chats[i])[0] === chatId) {
                console.log(Object.values(this.state.chats[i])[0]["messages"].length)
                if (Object.values(this.state.chats[i])[0]["messages"].length !== 0)
                    return Object.values(this.state.chats[i])[0]["messages"];
                else
                    return null;
            }
        }
        return null;
    }

    // Onclick handlers

    clearTextfieldAction = () => {
        const { chats, activeChat } = this.state;
        if (this.getMessges(activeChat) === null) {
            const copyChatState = Object.assign([], chats);
            // console.log("Should delete", activeChat)
            const obj = copyChatState.splice(activeChat, 1);
            // console.log("Should delete", obj)
            this.setState({ chats: copyChatState, textValue: '' })
        } else {
            console.log("Cant remove haha")
            this.setState({ textValue: '' });
        }
    }

    sendChatAction = (itemId, senderId, senderName, msg) => {
        // console.log(value);
        let receiverId;
        const conversation = this.getConversation(itemId);
        if (conversation.buyerId === senderId)
            receiverId = conversation.sellerId;
        else receiverId = conversation.buyerId;

        // if(getCompleteChat)
        const data = {
            itemId,
            senderId,
            receiverId,
            msg
        };

        console.log(data)
        if (msg !== "") {
            socket.emit('private_message', data, (error) => {
                if (!error) {

                    console.log("Data sent");
                    this.insertMessageInChat(
                        data.itemId,
                        data.senderId,
                        senderName,
                        data.msg);
                    // initialState.push(JSON.stringify(value).item);
                }
            });
        }

    }


    chatForm = (textValue) => (
        <div className="flex">
            <TextField
                label="Send a chat message"
                onChange={this.handleChange("textValue")}
                value={textValue}
                className="chatBox"
                multiline
                required
                rowsMax="5"
            //margin="normal"
            />
            <Button
                onClick={this.clearTextfieldAction}
                variant="contained"
                color="primary"
                className="button">
                Clear
          </Button>
            <Button
                variant="contained"
                color="primary"
                className="button"
                onClick={() => {
                    this.sendChatAction(
                        this.state.activeChat,
                        loggedInUser.user._id.toString(),
                        loggedInUser.user.name,
                        textValue
                    );
                    this.setState({ textValue: "" });
                }}>
                Send
          </Button>
        </div>
    );

    sellingForm = (name) => (
        <div className="flex">
            <Typography variant="body1" gutterBottom className="messageInfoText" >Have you sold this item to {name} ?</Typography>
            <Button
                variant="contained"
                color="primary"
                className="button">
                Sold
          </Button>
            <div className="flex">
                <Typography variant="body1" gutterBottom className="messageInfoText" >Can you please confirm your action once again</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="button">
                    Confirm
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="button">
                    Cancel
                </Button>
            </div>
        </div>
    );

    insertChat = (itemId, itemName, sellerId, sellerName, buyerId, buyerName, messages) => {
        return this.pushToAry(itemId, {
            'itemName': itemName,
            'sellerId': sellerId,
            'sellerName': sellerName,
            'buyerId': buyerId,
            'buyerName': buyerName,
            'messages': messages
        });
    }
    createMessage = (senderId, senderName, msg) => {
        return {
            'senderId': senderId,
            'msg': msg,
            'createdAt': new Date().toLocaleString(),
            'senderName': senderName
        };
    }


    insertMessageInChat = (itemId, senderId, senderName, msg) => {
        console.log(this.state.chats)
        const newMessage = this.createMessage(senderId, senderName, msg);

        this.setState({
            chats: this.state.chats.map((chat, index) => {
                if (Object.keys(chat)[0] === itemId) {
                    chat[itemId].messages = [...chat[itemId].messages, newMessage]
                }
                console.log("Inside 2 the impossible map")
                return chat;
            })
        });
        console.log("after insert", this.state.chats)
    }
    // react components default methods

    arrayRemove = (arr, value) => {

        return arr.filter(function (ele) {
            return Object.keys(ele)[0] != value;
        });

    }

    componentWillMount(props) {
        loggedInUser = isAuthenticated();
        console.log(loggedInUser.token)
        console.log(loggedInUser.user._id)

        if (loggedInUser === false) {
            return <Redirect to="/" />
        }

        socket = io('http://localhost:8080');

        loadConversations(loggedInUser.token).then(response => {
            // this.setState({ loading: false });
            // authenticate(response.data, () => {
            // console.log(response.data)
            const loadedState = [];
            console.log(response.data)
            response.data.map((chat) => {
                // chatObject
                let otherUserId;
                let role;
                if (loggedInUser.user._id === chat.buyerId) {
                    otherUserId = chat.sellerId;
                    role = 'seller';
                } else {
                    otherUserId = chat.buyerId;
                    role = 'buyer';
                }
                delete chat["_id"]
                delete chat["__v"]
                delete chat["createdAt"]
                // this.setState({ chats: [] });
                // console.log(chat)
                getUsername(otherUserId).then(res => {
                    // console.log(res);
                    let chatToInsert;
                    let newMessages = clonedeep(chat.messages);
                    newMessages.map((msg) => {
                        if (msg.senderId === loggedInUser.user._id) {
                            msg["senderName"] = loggedInUser.user.name;
                        }
                        else {
                            msg["senderName"] = res.data.name;
                        }
                        msg["createdAt"] = new Date(msg["createdAt"]).toLocaleString()
                        delete msg["_id"]
                        delete msg["__v"]
                        delete msg["chatId"]
                        // delete msg["_proto_"]
                        // console.log(msg)
                    })
                    //Have to modify loadConversations api, such that it sends Item Name as well
                    if (role === 'seller') {
                        chatToInsert = this.insertChat(chat.itemId, "FoodName", chat.sellerId, res.data.name, chat.buyerId, loggedInUser.user.name, newMessages)
                    }
                    else {
                        chatToInsert = this.insertChat(chat.itemId, "FoodName", chat.sellerId, loggedInUser.user.name, chat.buyerId, res.data.name, newMessages)
                    }
                    // console.log(chatToInsert)
                    loadedState.push(chatToInsert)

                    this.setState((state) => {
                        return {
                            chats: [...state.chats, chatToInsert]
                        };
                    });
                    console.log(this.state)
                }).catch(err => { console.log(err) });

            });
            // const loadedState = 
            // this.setState({ redirectToReferer: true });
            // });

            // console.log(loadedState)
            // this.setState((state) => {
            //     return {
            //         chats: loadedState
            //     };
            // });
        }).catch(error => {
            // this.setState({ loading: false });
            console.log(error);
            // this.setState({ error: err.response.data.error });
        });


        const { newChat } = this.props.location;

        if (newChat !== undefined) {

            // pushToAry(newChat.itemId, {
            //     itemName: newChat.itemName,
            //     sellerId: newChat.sellerId,
            //     sellerName: newChat.sellerName,
            //     buyerId: loggedInUser.user._id,
            //     buyerName: loggedInUser.user.name,
            //     messages: []
            // });

            console.log(this.checkIfAlreadyMessged(newChat.itemId))
            if (this.checkIfAlreadyMessged(newChat.itemId)) {
                console.log(newChat.itemId, " already exists")
                this.setState({ activeChat: newChat.itemId });
            } else {
                const tempNewChat = this.insertChat(newChat.itemId, newChat.itemName, newChat.sellerId, newChat.sellerName, loggedInUser.user._id, loggedInUser.user.name, [])

                console.log("tempNewChatSend", tempNewChat)
                const newConvo = [tempNewChat, ...this.state.chats]
                console.log("newConvoStartByMe", newConvo)
                this.setState((state) => {
                    return {
                        chats: [tempNewChat, ...state.chats]
                    };
                });
            }
        }
    }

    componentDidMount() {
        console.log("in componentDidMount")

        if (loggedInUser === false) {
            return <Redirect to="/" />
        }

        socket.on(loggedInUser.user._id, (data) => {
            console.log(data);

            const senderName = this.getSenderName(this.state.chats, this.state.activeChat, data.senderId);

            if (this.checkIfAlreadyMessged(data.itemId)) {
                console.log(data.itemId, " already exists")
                this.insertMessageInChat(
                    data.itemId,
                    data.senderId,
                    senderName,
                    data.msg);
            } else {
                const tempNewChat = this.insertChat(data.itemId, "FoodName", loggedInUser.user._id, loggedInUser.user.name, data.senderId, senderName, [])

                console.log("newItem", tempNewChat)
                const newConvo = [tempNewChat, ...this.state.chats]
                console.log("newConvo", newConvo)
                this.setState((state) => {
                    return {
                        chats: [tempNewChat, ...state.chats]
                    };
                });

                this.insertMessageInChat(
                    data.itemId,
                    data.senderId,
                    senderName,
                    data.msg);
            }


        })
        // socket.on(loggedInUser.user._id, (data) => {
        //     const parsedData = JSON.stringify(data)
        //     console.log(parsedData)

        //     // socket.emit(parsedData.receiverId, {from: parsedData.senderId, msg:parsedData.msg}, (error) => { console.log(error)})
        // })
    }

    render() {
        // loggedInUser = isAuthenticated();
        if (loggedInUser === false) {
            return <Redirect to="/" />
        }

        const { textValue, chats, error, activeChat } = this.state;

        if (activeChat === "") {
            if (chats.length > 0) {
                // console.log(Object.keys(chats[0])[0]);
                this.setState({ activeChat: Object.keys(chats[0])[0] });
                // console.log(activeChat);
            }
            // const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
        }
        // if (redirectToReferer) {
        //     return <Redirect to="/" />
        // }

        return Style.it(`
        .root {
            margin: '50px';
            /* padding: theme.spacing(3, 2); */
        }
        
        .flex {
            display: flex;
            align-items: center;
        }
        
        .topicsWindow {
            width: 30%;
            height: 300px;
            border-right: 1px solid grey;
        }

        .selectedTopic {
            background-color: #8A0651;
            color: white;
        }
        
        .chatWindow {
            width: 70%;
            height: 300px;
            padding: 20px;
            box-sizing: border-box;
            overflow: scroll;
        }
        
        .chatMessageRight {
            text-align: justify;
            text-align: -webkit-right;
            -moz-text-align-last: right;
            text-align-last: right;
            
        }

        .chatMessageLeft {
            text-align: justify;
            text-align: -webkit-left;
            -moz-text-align-last: left;
            text-align-last: left;
        }

        .messageInfoText {
            font-size: 0.3em;
        }

        .chatBox {
            width: 85%;
        }
        
        .button {
            width: 15%;
        }
        `,
            <div>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <Paper className="root">
                    <Typography variant="h4" component="h5">Chat app</Typography>
                    <Typography variant="h5" component="h5">{this.getActiveChatInfo()}</Typography>
                    <div className="flex">
                        <div className="topicsWindow">
                            <List>
                                {
                                    chats.map(chat => (
                                        <ListItem key={Object.keys(chat)[0]} onClick={e => this.handleChatChange(e, Object.keys(chat)[0])} className={activeChat === Object.keys(chat)[0] ? "selectedTopic" : ""} button>
                                            {(Object.values(chat)[0]["sellerId"] !== loggedInUser.user._id) ?
                                                <ListItemText primary={Object.values(chat)[0]["itemName"] + " by " + Object.values(chat)[0]["sellerName"]} />
                                                :
                                                <ListItemText primary={Object.values(chat)[0]["itemName"] + " by YOU"} />
                                            }
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div className="chatWindow" id="messages">
                            {
                                // console.log(this.filterChat(this.state.chats, activeChat))
                                this.filterChat(chats, activeChat).map((chat, i) => (
                                    // console.log(chat.from)
                                    (chat.senderId === loggedInUser.user._id) ?
                                        (<div className="flex" key={i} className="chatMessageLeft">
                                            <Chip label={chat.msg} className="chip" />
                                            <Typography variant="body1" gutterBottom className="messageInfoText" >{chat.senderName} @ {chat.createdAt}</Typography>
                                        </div>) :
                                        (<div className="flex" key={i} className="chatMessageRight">
                                            <Chip label={chat.msg} className="chip" />
                                            <Typography variant="body1" gutterBottom className="messageInfoText" >{chat.senderName} @ {chat.createdAt}</Typography>
                                        </div>)
                                ))
                            }
                            {/* {
                                console.log("filterchat",this.state.chats)
                            } */}
                        </div>
                    </div>
                    {this.chatForm(textValue)}
                    

                    
                    {/* {console.log("last",this.getActiveChatSellerInfo()["sellerName"])} */}
                    {this.getActiveChatSellerInfo().sellerId === loggedInUser.user._id ? this.sellingForm(this.getActiveChatSellerInfo().buyerName) : ""}
                </Paper>
            </div>
        );
    }
}

export default Chat;