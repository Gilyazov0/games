import React from "react";
import InfoBadge from './infoBadge'

interface InfoProps{
width:number,
score:number,
speed:number,
}

const Info: React.FC <InfoProps> = (props) => {

    const style ={width: `${props.width}px`}

    return <div style={style} className='info'>
            <InfoBadge value = {props.score} width={props.width} description = 'SCORE' /> 
            <InfoBadge value = {props.speed} width={props.width}description = 'SPEED' /> 
           </div>
}

export default Info