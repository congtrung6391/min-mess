import React from 'react';
import SearchPanel from '../views/searchPanel/SearchPanel';
import Conversation from '../views/conversation/Conversation';

const ConversationPage = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <SearchPanel />
      <Conversation />
    </div>
  );
}

export default ConversationPage;