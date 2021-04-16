import React from 'react';
import Comment from './Comment.js'

export default class CommentsList extends React.Component {

  constructor(props) {

    super(props);

  }

  render() {

    return (
      <div className="comments">
        {
          this.props.comments.length ? (
            this.props.comments.map((item) => 
              <Comment key={item.id} info={item} />)
           ) : (
             <div>Be the first to leave a comment</div>
           )
        }
      </div>
    );

  }

};