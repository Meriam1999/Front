import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

class chat extends Component {
  //is a function 
  render() {
    
    return (
    
      <ChatBot
    steps={[
      {
        id: '1',
        message: 'Bienvenue , Avez vous Des Questions ?'
        ,
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'what does this website offer? ', trigger: '4' },
          { value: 2, label: 'how can i create an account ?', trigger: '5' },
          { value: 3, label: 'can i contact an expert?', trigger: '3' },
        ],
      },
      {
        id: '3', 
        message: 'you are more than welcomed , an expert will be at your service soon , thanks for waiting',
        trigger: '2',
      },
      {
        id: '5',
        message: 'yes of course you can, so simple be at ease  , check here',
        trigger: '2',
      },
      {
        id: '4',
        message: 'this website offer you the ability to have a medicament for free or',
        trigger:'2',
      },
    ]}
  />
    );
  
  }
}
 
export default chat;