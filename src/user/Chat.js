import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";
// import update from 'immutability-helper';

import { isAuthenticated } from '../auth';
import { loadUserConversations } from '../utils/chat';
import { getUsername } from '../utils/user';

import { makeStyles } from '@material-ui/core/styles';
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
            chats: [
                {
                    "5d1c9edbdafc7451e8dd4000": {
                        itemName: 'Chicken Karahi',
                        sellerId: "5d2393f42e252b8751e4be2e",
                        sellerName: "Amber Kazmi",
                        buyerId: "5d2393992e252b8751e4be2c",
                        buyerName: "Zaeem Kazmi",
                        messages: [{ senderId: "5d2393992e252b8751e4be2c", senderName: "Zaeem Kazmi", msg: "Sis can I buy it?" }]
                    }
                },
                {
                    "5d1c9edbdafc7451e8dd4010": {
                        itemName: 'Pasta',
                        sellerId: "5d2393992e252b8751e4be2c",
                        sellerName: "Zaeem Kazmi",
                        buyerId: "5d2393f42e252b8751e4be2e",
                        buyerName: "Amber Kazmi",
                        messages: [
                            { senderId: "5d2393f42e252b8751e4be2e", senderName: "Amber Kazmi", msg: "Hi" },
                            { senderId: "5d2393f42e252b8751e4be2e", senderName: "Amber Kazmi", msg: "For how much?" },
                            { senderId: "5d2393992e252b8751e4be2c", senderName: "Zaeem Kazmi", msg: "For 50Rs" }
                        ]
                    }
                },
                {
                    "5d1c9edbdafc7451e8dd4005": {
                        itemName: 'Chicken Biryani',
                        sellerId: "5d2393f42e252b8751e4be2e",
                        sellerName: "Amber Kazmi",
                        buyerId: "5d2393992e252b8751e4be2c",
                        buyerName: "Zaeem Kazmi",
                        messages: [
                            { senderId: "5d2393992e252b8751e4be2c", senderName: "Zaeem Kazmi", "msg": "Is that the final price?" },
                            { senderId: "5d2393f42e252b8751e4be2e", senderName: "Amber Kazmi", "msg": "Yup :)" },
                            { senderId: "5d2393992e252b8751e4be2c", senderName: "Zaeem Kazmi", msg: "I see, thanks for response" }
                        ]
                    }
                }
            ],
            activeChat: "",
            error: ""
        }
    }

    useStyles = makeStyles(theme => ({
        root: {
            margin: '50px',
            padding: theme.spacing(3, 2),
        },
        flex: {
            display: 'flex',
            alignItems: 'center'
        },
        topicsWindow: {
            width: '30%',
            height: '300px',
            borderRight: '1px solid grey'
        },
        chatWindow: {
            width: '70%',
            height: '300px',
            padding: '20px'
        },
        chatBox: {
            width: '85%'
        },
        button: {
            width: '15%'
        },
    }));



    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    handleChatChange = (event, index) => {
        this.setState({ activeChat: index });
    }

    // clickSubmit = event => {
    //     event.preventDefault();
    //     this.setState({ loading: true });
    //     const { email, password } = this.state;

    //     const user = {
    //         email,
    //         password
    //     };
    //     console.log(user);
    //     login(user).then(response => {
    //         this.setState({ loading: false });
    //         authenticate(response.data, () => {
    //             this.setState({ redirectToReferer: true });
    //         });
    //     }).catch(err => {
    //         this.setState({ loading: false });
    //         console.log(err.response);
    //         this.setState({ error: err.response.data.error });
    //     });
    // }

    filterChat = (array, id) => {
        let newArray = clonedeep(array);
        for (var i = 0; i < newArray.length; i++) {
            if (Object.keys(newArray[i])[0] === id) {
                return newArray[i][id]["messages"];
            }
        }
        return [];
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
        // socket.emit('private_message', value, (error) => {
        //     if (!error) {
        //         // initialState.push(JSON.stringify(value).item);
        //     }
        // });

    }


    chatForm = (textValue) => (
        <div className={this.useStyles.flex}>
            <TextField
                label="Send a chat message"
                onChange={this.handleChange("textValue")}
                value={textValue}
                className={this.useStyles.chatBox}
                multiline
                required
                rowsMax="5"
            //margin="normal"
            />
            <Button
                onClick={this.clearTextfieldAction}
                variant="contained"
                color="primary"
                className={this.useStyles.button}>
                Clear
          </Button>
            <Button
                variant="contained"
                color="primary"
                className={this.useStyles.button}
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
            'senderName': senderName,
            'msg': msg,
            'createdAt': Date.now()
        };
    }

    insertMessageInChat = (itemId, senderId, senderName, msg) => {
        console.log(this.state.chats)
        const newMessage = this.createMessage(senderId, senderName, msg);

        // console.log(this.state.chats[this.getChatIndexInState(itemId)])
        // // const messages 
        // this.setState({
        //     chats: update(this.state.chats, {[itemId]: {messages: {$set: newMessage}}})
        //   })
        // console.log(this.state)
        // .setState((state) => {

        //     return {
        //         chats: {
        //             [itemId] : {
        //                 'messages': [...state.chats[itemId].messages, newMessage]
        //             }
        //         } 
        //     };
        // });

       return;
        // this.setState((state) => {

        //     return {
        //         chats: {
        //             [itemId] : {
        //                 'messages': [...state.chats[itemId].messages, newMessage]
        //             }
        //         } 
        //     };
        // });
    }
    // react components default methods

    componentWillMount(props) {
        loggedInUser = isAuthenticated();
        console.log(loggedInUser.token)
        console.log(loggedInUser.user._id)

        if (loggedInUser === false) {
            return <Redirect to="/" />
        }

        socket = io('http://localhost:8080');

        loadUserConversations(loggedInUser.token).then(response => {
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
                this.setState({chats : []});
                // console.log(chat)
                getUsername(otherUserId).then(res => {
                    // console.log(res);
                    let chatToInsert;
                    let newMessages = clonedeep(chat.messages);
                    newMessages.map((msg) => {
                        if(msg.senderId === loggedInUser.user._id){
                            msg["senderName"] = loggedInUser.user.name;
                        }
                        else {
                            msg["senderName"] = res.data.name;
                        }
                        console.log(msg["senderName"])
                    })
                    if (role === 'seller') {
                        chatToInsert = this.insertChat(chat.itemId, "ChatName", chat.sellerId, res.data.name, chat.buyerId, loggedInUser.user.name, newMessages)
                    }
                    else {
                        chatToInsert = this.insertChat(chat.itemId, "ChatName", chat.sellerId, loggedInUser.user.name, chat.buyerId, res.data.name, newMessages)
                    }
                    // console.log(chatToInsert)
                    loadedState.push(chatToInsert)
                  
                    this.setState((state) => {
                        return {
                            chats: [...state.chats, chatToInsert]
                        };
                    });
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
            const tempNewChat = this.insertChat(newChat.itemId, newChat.itemName, newChat.sellerId, newChat.sellerName, loggedInUser.user._id, loggedInUser.user.name, [])

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
                console.log("newItem", tempNewChat)
                const newConvo = [tempNewChat, ...this.state.chats]
                console.log("newConvo", newConvo)
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
            console.log(data)
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

        return (
            <div>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <Paper className={this.useStyles.root}>
                    <Typography variant="h4" component="h5">Chat app</Typography>
                    <Typography variant="h5" component="h5">{this.getActiveChatInfo()}</Typography>
                    <div className={this.useStyles.flex}>
                        <div className={this.useStyles.topicsWindow}>
                            <List>
                                {
                                    chats.map(chat => (
                                        <ListItem key={Object.keys(chat)[0]} onClick={e => this.handleChatChange(e, Object.keys(chat)[0])} button>
                                            <ListItemText primary={Object.values(chat)[0]["itemName"] + " by " + Object.values(chat)[0]["sellerName"]} />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div className={this.useStyles.chatWindow}>
                            {
                                // console.log(this.filterChat(chats, activeChat))
                                this.filterChat(chats, activeChat).map((chat, i) => (
                                    // console.log(chat.from)
                                    <div className={this.useStyles.flex} key={i}>
                                        <Chip label={chat.senderName} className={this.useStyles.chip} />
                                        <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {this.chatForm(textValue)}
                </Paper>
            </div>
        );
    }
}

export default Chat;