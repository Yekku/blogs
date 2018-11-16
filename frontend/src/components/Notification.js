import React from "react";

const Success = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="success">{message}</div>;
};

const Alert = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
}

export default { Success, Alert };