import React from 'react'
import {Row,RowProps} from './row'
import Info from "./info";
import Message from './message'
import { CELL_SIZE, DIRECTION,COLS_NUM,ROWS_NUM,Direction}  from "./constants";


export interface RowData{
    row:RowProps
    id: string|number
} 

interface GlassData{
    rows:RowData[],
    maxHight:number,
    maxWidth:number,
    score:number,
    speed:number,
}

export interface GlassProps{
   pause?:boolean,
   gameOver?:boolean,
   previewGlass?:GlassData,
   glass: GlassData
}
 
export const Glass: React.FC<GlassProps> = (props) => {
    const glass = props.glass.rows;

    const rows = glass.map(row=> <Row key={row.id} cells={row.row.cells} ids={row.row.ids}/>)
    
    const style={width: `${CELL_SIZE *COLS_NUM }px`,
                 height: `${CELL_SIZE * ROWS_NUM}px`}    
    
    return <div className={`glass--outer  glass--outer--${DIRECTION===Direction.row?'right': 'bottom'}`} style={{'flexDirection': DIRECTION === Direction.row?'row':'column'}}>  
               <div className={props.previewGlass?'glass--inner':''} style={style}>
                     {props.previewGlass && props.pause && !props.gameOver && <Message message={['PAUSE']}/>}
                     {props.previewGlass && props.gameOver && 
                         <Message message={['GAME OVER',  `YOUR SCORE ${props.previewGlass.score}`, `SPEED ${props.previewGlass.speed}`]}/>}
                          
                     {rows}

               </div>
            {props.previewGlass && <div className={`glass--preview glass--preview--${DIRECTION===Direction.row?'right': 'bottom'}`}  
                                        style={{'flexDirection':  DIRECTION === Direction.row?'column':'row'}}>
                                   <Info  width={CELL_SIZE*3+10}  score={props.glass.score} speed={props.glass.speed}></Info>
                                   <Glass
                                   glass={{
                                   rows: props.previewGlass.rows,
                                   maxWidth: CELL_SIZE*3,
                                   maxHight: CELL_SIZE*4,
                                   score:1,
                                   speed:1,
                                   }}
                                   previewGlass={undefined}
                                   />
                             </div>}
           </div>
}

export default Glass


