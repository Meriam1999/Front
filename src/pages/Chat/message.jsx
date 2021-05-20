import React from 'react'
import './message.css';

function message({own}) {
    return (
        <div className={own ? "message own":"message"}>
            <div className="MessageTop">
                <img className="MessageImg" src="https://source.unsplash.com/random" alt=""/>

                <p className="MessageText">Hello this is a message </p>
            </div>

            <div className="MessageBottom">il ya 1 heure</div>
        </div>
    )
}

export default message
