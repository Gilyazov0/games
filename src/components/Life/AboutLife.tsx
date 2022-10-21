import React from "react";
import CloseButton from "../CloseButton";

const AboutLife: React.FC<{ close: Function }> = function (props) {
  return (
    <div className="about">
      <CloseButton close={props.close} />
      Here is a text about game of life
    </div>
  );
};

export default AboutLife;
