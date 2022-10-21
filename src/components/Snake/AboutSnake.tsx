import React from "react";
import CloseButton from "../CloseButton";

const AboutSnake: React.FC<{ close: Function }> = function (props) {
  return (
    <div className="about">
      <CloseButton close={props.close} />
      Here is a text about snake game
    </div>
  );
};

export default AboutSnake;
