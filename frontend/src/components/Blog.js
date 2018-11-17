import React from 'react'
import { Button } from "semantic-ui-react";
class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "1px solid black",
      marginBottom: 5
    };
    const showDetails = { display: this.state.visible ? "" : "none" };
    const showDeleteButton = { display: this.props.blog.user.username === this.props.loggedUser.username ? '' : 'none'}

    return <div style={blogStyle}>
        <div onClick={this.toggleVisibility} className="name">
          <span className="bold">'{this.props.blog.title}'</span> Author: {this.props.blog.author}
        </div>
        <div style={showDetails} className="content">
          <a href={this.props.blog.url} target="blanck">
            {this.props.blog.url}
          </a>
          <br />
          Has {this.props.blog.likes} <Button content="Like" icon="heart" size='mini' onClick={this.props.handleLikes} />
          <br />
          Added by {this.props.blog.user.name}
          <br />
          <Button onClick={this.props.handleDelete} style={showDeleteButton} size='mini' content="DELETE" />
        </div>
      </div>;
  }
}

export default Blog