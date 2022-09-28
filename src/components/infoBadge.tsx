import React from "react";

interface InfoBadgeProps {
  description: string;
  value?: number;
  width: number;
}
export const InfoBadge: React.FC<InfoBadgeProps> = (props) => {
  const message: string =
    props.value !== undefined
      ? `${props.description}:${props.value}`
      : props.description;
  const fontSize = props.width / message.length;

  return (
    <div className="infoBadge" style={{ fontSize: fontSize }}>
      {message}
    </div>
  );
};

export default InfoBadge;
