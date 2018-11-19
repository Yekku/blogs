import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

class Notification extends React.Component {
  render() {
    const notification = this.props.notification

    if (notification === "" || notification === null) {
      return null;
    }
    return <Message success>{notification}</Message>;
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
