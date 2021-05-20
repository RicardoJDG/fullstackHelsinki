import React from 'react';

const Notification = ({ message, status }) => {
  return message ? <div className={status}>{message}</div> : null;
};

export default Notification;
