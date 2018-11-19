import React from "react";
import { Button, Form } from "semantic-ui-react"

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: ""
    };
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("comment:", this.state.comment);
    this.props.handleComment({
      comment: this.state.comment
    });
    this.setState({
      comment: ""
    });
  };

  render() {
    return (
      <div>
        <h4>You comment</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field style={{ width: 300 }}>
            <label>Comment</label>
            <textarea
              name="content"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit" size="mini">
            Comment
          </Button>
        </Form>
      </div>
    );
  }
}

export default CommentForm