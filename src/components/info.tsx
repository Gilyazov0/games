import React from "react";
import InfoBadge from "./InfoBadge";

interface InfoProps {
  width: string;
  score: number;
  speed: number;
}

const Info: React.FC<InfoProps> = (props) => {
  const style = { width: props.width };

  return (
    <div style={style} className="info">
      <InfoBadge value={props.score} description="SCORE" />
      <InfoBadge value={props.speed} description="SPEED" />
    </div>
  );
};

export default Info;
