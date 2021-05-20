import React from 'react'
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/NavBar/SideBar2';
import './Chat.css';
import Conversation from './Conversations';
import Message from './message';
import ChatOnligne from './ChatOnline';

function Chat2() {
  return (
    <div>
      <Sidebar/>
      <div className="messenger">

        <div className="ChatMenu">
          <div className="ChatMenuWrapper" >
              <input placeholder="Rechercher conversation" className="ChatMenuInput"/>
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              
          </div>
       </div> 

        <div className="ChatBox">
           <div className="ChatBoxWrapper" >
             <div className="ChatBoxTop">
               <Message />
               <Message own={true}/>
               <Message own={true}/>
               <Message />
                <Message/>
               <Message own={true}/>
              </div>

             <div className="ChatBoxBottom">
               <textarea className="chatMessageInput" placeholder="ecrire un message..."></textarea>
               <button className="chatSubmitButton">Envoyer</button>
             </div>
          </div>
        </div> 

        <div className="ChatOnline">
           <div className="ChatOnlineWrapper" >
             <ChatOnligne />
            </div>
      </div>
      </div> 
    </div>
  )
}

export default Chat2
