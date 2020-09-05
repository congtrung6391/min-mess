import React from 'react';
import SearchPanel from '../views/searchPanel/SearchPanel';
import Conversation from '../views/conversation/Conversation';

const ConversationPage = (props) => {
  return (
    <div>
      <SearchPanel />
      <Conversation />
    </div>
  );
}

export default ConversationPage;