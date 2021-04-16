import React from 'react';

export default class Comment extends React.Component {

  constructor(props) {

    super(props);

    this.state = props.info;

  }

  render() {

    return (
      <div>
        <hr />
        <h3>{this.state.author}</h3>
        <p>{this.state.content}</p>
        <div><em>{this.state.date}</em></div>
      </div>
    );

  }

};