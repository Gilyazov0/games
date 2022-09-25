import React from "react";

interface InfoBadgeProps{
    description:string,
    value: number,
    width: number
}
export const InfoBadge: React.FC <InfoBadgeProps> = (props) => { 

    const message = `${props.description}:${props.value}`
    const fontSize = props.width /  message.length;

    return <div className='infoBadge' style={{fontSize: fontSize}}>
                {message}
           </div>
}

export default InfoBadge