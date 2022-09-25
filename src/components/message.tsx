import React from "react";

const Message: React.FC<{ message: string[] }> = (props) => {
  const messages = props.message.map((msg, index) => (
    <div key={index}> {msg}</div>
  ));
  return <div className="message">{messages}</div>;
};

export default Message;
