import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";
import classes from "./Chat.css";
import Style from 'style-it';
import $ from "jquery";
// import update from 'immutability-helper';

import { isAuthenticated } from '../auth';
import { loadConversations } from '../utils/chat';
import { getUsername } from '../utils/user';
import { getItem, updateItem } from '../utils/item';

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
const clonedeep = require('lodash.clonedeep');
var ObjectID = require("bson-objectid");

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

    checkIfAlreadyMessged(itemId, personId) {
        let i;
        console.log("In checkIfAlreadyMessged", this.state.chats)
        for (i in (this.state.chats)) {
            console.log("XXX00", Object.values(this.state.chats[i])[0])
            console.log("XXXXX", itemId, Object.values(this.state.chats[i])[0]["itemId"])
            console.log("XXXX1", personId, Object.values(this.state.chats[i])[0]["sellerId"], Object.values(this.state.chats[i])[0]["buyerId"])
            if ((Object.values(this.state.chats[i])[0]["itemId"] === itemId) &&
                ((Object.values(this.state.chats[i])[0]["sellerId"] === personId) ||
                    (Object.values(this.state.chats[i])[0]["buyerId"] === personId))) {
                return Object.keys(this.state.chats[i])[0];
            }
        }
        return null;
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
            // console.log("Cant remove haha")
            this.setState({ textValue: '' });
        }
    }

    sendChatAction = (chatId, itemId, senderId, senderName, msg) => {
        // console.log(value);
        let receiverId;

        const conversation = this.getConversation(chatId);
        if (conversation.buyerId === senderId) {
            receiverId = conversation.sellerId;
        }
        else receiverId = conversation.buyerId;

        const itemName = conversation.itemName;
        msg = msg.trim();

        if (msg !== "") {
            const data = {
                chatId,
                itemId,
                itemName,
                senderId,
                senderName,
                receiverId,
                msg
            };
            console.log("toSend", data)

            socket.emit('private_message', data, (error) => {
                if (!error) {

                    console.log("Data sent");
                    this.insertMessageInChat(
                        data.chatId,
                        data.senderId,
                        senderName,
                        data.msg);
                    // initialState.push(JSON.stringify(value).item);
                }
            });
        }

    }



    insertChat = (chatId, itemId, itemName, sellerId, sellerName, buyerId, buyerName, messages, available, soldTo) => {
        return this.pushToAry(chatId, {
            'itemId': itemId,
            'itemName': itemName,
            'sellerId': sellerId,
            'sellerName': sellerName,
            'buyerId': buyerId,
            'buyerName': buyerName,
            'messages': messages,
            'available': available,
            'soldTo': soldTo
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


    insertMessageInChat = (chatId, senderId, senderName, msg) => {
        // console.log(this.state.chats)
        const newMessage = this.createMessage(senderId, senderName, msg);

        this.setState({
            chats: this.state.chats.map((chat, index) => {
                if (Object.keys(chat)[0] === chatId) {
                    chat[chatId].messages = [...chat[chatId].messages, newMessage]
                }
                // console.log("Inside 2 the impossible map")
                return chat;
            })
        });
        // console.log("after insert", this.state.chats)
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
                // delete chat["_id"]
                delete chat["__v"]
                delete chat["createdAt"]
                // this.setState({ chats: [] });
                // console.log(chat)

                getItem(loggedInUser.token, chat.itemId).then(res => {
                    console.log("itemsTableResponse", res.data)
                    chat["available"] = res.data.status;
                    chat["soldTo"] = res.data.buyerId;
                    chat["itemName"] = res.data.name;
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
                        console.log(chat)
                        //Have to modify loadConversations api, such that it sends Item Name as well
                        if (role === 'seller') {
                            chatToInsert = this.insertChat(chat._id, chat.itemId, chat.itemName, chat.sellerId, res.data.name, chat.buyerId, loggedInUser.user.name, newMessages, chat.available, chat.soldTo)
                        }
                        else {
                            chatToInsert = this.insertChat(chat._id, chat.itemId, chat.itemName, chat.sellerId, loggedInUser.user.name, chat.buyerId, res.data.name, newMessages, chat.available, chat.soldTo)
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

                }).catch(err => { console.log(err) });

            })

        }).catch(error => {
            // this.setState({ loading: false });
            console.log(error);
            // this.setState({ error: err.response.data.error });
        });

        setTimeout(() => {
            console.log('Hello, World!')


            const { newChat } = this.props.location;

            if (newChat !== undefined) {
                const chatIdIfExists = this.checkIfAlreadyMessged(newChat.itemId, newChat.sellerId);
                console.log("chatIdIfExists", chatIdIfExists)
                if (chatIdIfExists !== null) {
                    console.log("Chat " + chatIdIfExists + "already exists for " + newChat.itemId)
                    this.setState({ activeChat: chatIdIfExists });
                } else {
                    const tempNewChat = this.insertChat(ObjectID().toString(), newChat.itemId, newChat.itemName, newChat.sellerId, newChat.sellerName, loggedInUser.user._id, loggedInUser.user.name, [], true, "")

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
        }, 5000);
    }

    componentDidMount() {
        console.log("in componentDidMount")

        if (loggedInUser === false) {
            return <Redirect to="/" />
        }

        socket.on(loggedInUser.user._id, (data) => {
            console.log("onReceive", data);

            const senderName = this.getSenderName(this.state.chats, this.state.activeChat, data.senderId);

            const chatIdIfExists = this.checkIfAlreadyMessged(data.itemId, data.senderId);

            if (chatIdIfExists !== null) {
                console.log("Chat " + chatIdIfExists + "already exists for " + data.itemId)
                this.insertMessageInChat(
                    data.chatId,
                    data.senderId,
                    senderName,
                    data.msg);
            } else {
                const tempNewChat = this.insertChat(data.chatId, data.itemId, data.itemName, loggedInUser.user._id, loggedInUser.user.name, data.senderId, data.senderName, [], true, "")

                console.log("newItem", tempNewChat)
                const newConvo = [tempNewChat, ...this.state.chats]
                console.log("newConvo", newConvo)
                this.setState((state) => {
                    return {
                        chats: [tempNewChat, ...state.chats]
                    };
                });

                this.insertMessageInChat(
                    data.chatId,
                    data.senderId,
                    data.senderName,
                    data.msg);
            }


        })
        // socket.on(loggedInUser.user._id, (data) => {
        //     const parsedData = JSON.stringify(data)
        //     console.log(parsedData)

        //     // socket.emit(parsedData.receiverId, {from: parsedData.senderId, msg:parsedData.msg}, (error) => { console.log(error)})
        // })
    }


    chatForm = (textValue) => (
        <div className="flex">
            <Button
                onClick={this.clearTextfieldAction}
                variant="contained"
                color="primary"
                className="button">
                Clear
            </Button>
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
                variant="contained"
                color="primary"
                className="button"
                onClick={() => {
                    this.sendChatAction(
                        this.state.activeChat,
                        this.getActiveChatSellerInfo().itemId,
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

    handleSoldFood = () => {
        $('#confirmSellHidden').show();
        $('#sellButton').attr("disabled", true);
        $('#sellButton').attr("disableFocusRipple", true);
    }

    handlCancelSoldFood = () => {
        console.log("In cancel sold --- that was a mistake");
        $('#confirmSellHidden').hide();
        $('#sellButton').attr("disabled", false);
        $('#sellButton').attr("disableFocusRipple", false);
    }

    handleConfirmSoldFood = () => {
        console.log("Confirm sold was pressed");
        const activeChat = this.state.activeChat;
        const currectActiveChatData = this.getActiveChatSellerInfo();
        const status = false;
        const buyerId = currectActiveChatData.buyerId;
        updateItem(loggedInUser.token, currectActiveChatData.itemId, { status, buyerId }).then(res => {
            console.log("UpdateDbResponse", res);
            this.setState({
                chats: this.state.chats.map((chat, index) => {
                    if (Object.values(chat)[0].itemId === currectActiveChatData.itemId) {
                        Object.values(chat)[0].available = status
                    }
                    if (Object.keys(chat)[0] === activeChat) {
                        Object.values(chat)[0].soldTo = buyerId;
                    }

                    return chat;
                })
            });
        }).catch(err => { console.log(err) });


        // console.log("Sold status updated", this.state.chats)

        $('#confirmSellHidden').hide();
        $('#sellButton').attr("disabled", false);
        $('#sellButton').attr("disableFocusRipple", false);
    }

    sellingForm = (name) => (
        <div className="flex" id="sellFoodBox">
            <div className="flex sellDiv">
                <Typography variant="body1" gutterBottom className="" >Have you sold this item to {name} ?</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    id="sellButton"
                    onClick={this.handleSoldFood}>
                    Sold
                </Button>
            </div>
            <div className="flex" id="confirmSellHidden">
                <Typography variant="body1" gutterBottom className="" >Can you please confirm your action once again</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={this.handlCancelSoldFood}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={this.handleConfirmSoldFood}>
                    Confirm
                </Button>
            </div>
        </div>
    );


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
            box-sizing: border-box;
            overflow: scroll;
        }

        .selectedTopic {
            background-color: #3E66EF;
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

        #sellFoodBox {
            display: block;
            justify-content: center;
        }
        
        #sellDiv {
            white-space: pre-line;
            justify-content: center;
            margin-top: 30px;
        }
        
        #confirmSellHidden {
            display: block;
            display: none;
            justify-content: center;
        }

        #confirmSellVisible {
            display: block;
            
        }

        .button {
            width: 15%;
            margin: 10px;
        }
        `,
            <div className="container">
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <Paper className="root">
                    <Typography variant="h4" component="h5">Chat</Typography>
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
                                        (<div className="flex" key={i} className="chatMessageRight">
                                            <Chip label={chat.msg} className="chip" />
                                            <Typography variant="body1" gutterBottom className="messageInfoText" >{chat.senderName} @ {chat.createdAt}</Typography>
                                        </div>) :
                                        (<div className="flex" key={i} className="chatMessageLeft">
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
                </Paper>
                {(this.getActiveChatSellerInfo().sellerId === loggedInUser.user._id)
                    ? ((this.getActiveChatSellerInfo().available === true)
                        ? this.sellingForm(this.getActiveChatSellerInfo().buyerName)
                        : (this.getActiveChatSellerInfo().buyerId === this.getActiveChatSellerInfo().soldTo)
                            ? "You have already sold this item to " + this.getActiveChatSellerInfo().buyerName + "."
                            : "This item is no longer available.")
                    : ""}
            </div>
        );
    }
}

export default Chat;