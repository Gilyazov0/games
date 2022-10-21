import React from "react";
const CloseButton: React.FC<{ close: Function }> = (props) => {
  return (
    <span className="close--button" onClick={() => props.close()}>
      &times;
    </span>
  );
};

export default CloseButton;
