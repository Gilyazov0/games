import React from "react";

interface InfoBadgeProps {
  description: string;
  value?: number;
}
export const InfoBadge: React.FC<InfoBadgeProps> = (props) => {
  const message: string =
    props.value !== undefined
      ? `${props.description}:${props.value}`
      : props.description;

  return <div className="infoBadge">{message}</div>;
};

export default InfoBadge;
