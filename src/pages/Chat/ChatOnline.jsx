import React from 'react'
import './Chatonline.css';

function ChatOnline() {
    return (
        <div className="ChatOnline">
            <div classNamw="ChatOnlineFriend">
                <div className="ChatOnlineImgContainer">
                    <img className="ChatOnlineImg" 
                    src="https://source.unsplash.com/random"
                     alt=""
                     />
                    <div className="ChatOnlineBadge"></div>
                </div>
                 <span className="ChatOnlineName"> Mariem Souissi</span>
            </div>
        </div>
    )
}

export default ChatOnline
