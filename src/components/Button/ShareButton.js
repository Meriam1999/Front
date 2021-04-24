import React from 'react';
import ShareButton from 'react-social-share-buttons';



  const ShareButtons=()=>{

    return(
        <>
        <h2> Partager cette publication sur : </h2>
        <center>
        <div style={{ display:"flex" ,flexDirection:"row",marginLeft:"380px"}}  >
        <ShareButton
                compact
                socialMedia={'facebook'}
                url={"https://xkcd.com/1024/"}
                media={"https://imgs.xkcd.com/comics/error_code.png"}
            />
            <ShareButton
                compact
                socialMedia={'google-plus'}
                url={"https://xkcd.com/1024/"}
                media={"https://imgs.xkcd.com/comics/error_code.png"}
            />
            <ShareButton
                compact
                socialMedia={'twitter'}
                url={"https://xkcd.com/1024/"}
                media={"https://imgs.xkcd.com/comics/error_code.png"}
            />
            <ShareButton
                compact
                socialMedia={'pinterest'}
                url={"https://xkcd.com/1024/"}
                media={"https://imgs.xkcd.com/comics/error_code.png"}
            />
        </div>
        </center>
        </>
    )
  };
  export default ShareButtons;