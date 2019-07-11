import React from 'react';

import Conversations from './Conversations';
import Store from './Store';

const ChatPanel = props => {
    return <Store>
        <Conversations {...props} />
    </Store>
}

export default ChatPanel;