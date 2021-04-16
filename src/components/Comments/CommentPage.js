import React from 'react';
import CommentsForm from './CommentForm.js';
import CommentsList from './CommentsList.js';

export default class CommentsPage extends React.Component {

  constructor() {

    super();

    this.state = {
      comments: [
        
      ]
    }

  }

  saveComments(comment) {
    comment.id = this.state.comments.length;

    this.setState(prevState => ({
      comments: [...prevState.comments, comment]
    }));
  }

  render() {

    return (
      <div className="container">
        <CommentsForm saveComments={this.saveComments.bind(this)} />
        <CommentsList comments={this.state.comments} />
      </div>
    );

  }

};