import React from 'react';
// import io from 'socket.io-client';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { isAuthenticated } from '../auth';
import { CTX } from './Store';

// const socket = io('http://localhost:8080');

const useStyles = makeStyles(theme => ({
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

const Conversations = props => {
  const classes = useStyles();


  const loggedInUser = isAuthenticated();
  const { newChat } = props.location;

  // CTX store
  const { allChats, sendChatAction } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState('');

  console.log({ allChats });

  if (loggedInUser !== false) {
    console.log(loggedInUser);
    console.log(newChat)

    // if (loggedInUser.user._id.toString() !== "5d1c9edbdafc7451e8dd44c0") {
      if (newChat !== undefined) {
        topics.push(newChat.itemId);
        topics.reverse();
      }
      // socket.emit('private_message', {
      //   from: loggedInUser.user._id,
      //   to: "5d1c9edbdafc7451e8dd44c0",
      //   msg: 'Hello sis'
      // });
    // }
    // socket.on(loggedInUser.user._id, (data) => {
    //   console.log(data);
    // })
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h5">
          Chat app
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {
                topics.map(topic => (
                  <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))
              }
            </List>
          </div>
          <div className={classes.chatWindow}>
            {
              allChats[activeTopic].map((chat, i) => (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
                </div>
              ))
            }
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a chat message"
            className={classes.chatBox}
            multiline
            required
            rowsMax="5"
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          //margin="normal"
          />
          <Button variant="contained" color="primary" className={classes.button}>
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendChatAction({
                from: loggedInUser.user._id.toString(), 
                to: newChat.sellerId, 
                item: newChat.itemId,
                msg: textValue
              }); 
              changeTextValue('');
            }}
            >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );

}
export default Conversations;