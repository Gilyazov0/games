import React from "react";
import CloseButton from "../CloseButton";

const AboutTetris: React.FC<{ close: Function }> = function (props) {
  return (
    <div className="about">
      <CloseButton close={props.close} />
      Here is a text about tetris game
    </div>
  );
};

export default AboutTetris;
