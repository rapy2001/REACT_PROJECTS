import React from 'react';

const Timer = (props) => {
    
    return (
        <div className = 'timer'>
            <div className = 'timer_box_1'>
                <h3>Time: {props.time}</h3>
                {/* <div className = 'bar' style = {{width:`${props.width}%`}}></div> */}
            </div>
            <div className = 'timer_box_2'>
                <div className = 'time_box'>
                    <h4>{props.score}</h4>
                </div>
            </div>
           
        </div>
    )
}
export default Timer;