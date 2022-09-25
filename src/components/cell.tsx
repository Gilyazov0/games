import React from "react";

export interface CellProps{
    cellSize?: number,    
    color:string,
    isFilled: boolean
}

 export const Cell:React.FC<CellProps> = (props)=>{
    if (!props.cellSize)    
        throw Error('Attempting to render zero size cell');

    const style ={
        width: `${props.cellSize}px`,
        height: `${props.cellSize}px`
    }
    return <div style={style} className='cell--outer'> 
                <div className={`cell ${props.isFilled?'cell--full':'cell--empty'}` }
                    style={{backgroundColor: props.color} }>
                </div> 
           </div>
}
export default Cell;