import React from "react";

const Message:React.FC <{message: string[]}> = (props)=> {
  
 const messages = props.message.map(msg =><div> {msg}</div>)
    return <div className="message"> 
            {messages}
           </div>
}

export default Message;