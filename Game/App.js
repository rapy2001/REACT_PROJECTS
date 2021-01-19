import React from 'react';
import './public/style.css';
import Timer from './components/Timer';
import Face from './components/Face';
let interval = null;
let interval2 = null;
var flg = 0;
const App = () => {
    //Timer Code

    let og = 5;
    let ogW = 80;
    const [time,setTime] = React.useState(og);
    
    React.useEffect(() => {
        interval = setInterval(() => {
            setTime((time) => {
                if(time == 0)
                    setScore(0);
                if(time > 0)
                    return time - 1;
                else
                    return time;
            }
            );
            
        },1000);
        return () => {
            clearInterval(interval);
        }
    })

    //Timer Code

    // Faces Code
    const [score,setScore] = React.useState(0);
    
    const changeFlg = (val) => {
        flg = val;
        console.log('flg ' + flg);
    }

    const changeScore = () => {
        if(time > 0 && flg == 1)
        {
           
            setScore((score) => score + 1)
        }
    }
    let d = new Date();
    const [faces,setFaces] = React.useState([
        {
            rate:20,
            color:'red',
            key:d.getTime()
        }
    ]);
    React.useEffect(() => {
        interval2 = setInterval(() => {
            if(time > 0)
            {
                setFaces((state) => {
                    if(score < 10)
                    {
                        return [
                            ...state,
                            {rate:5,color:'blue',key:Date.now().toString()}
                        ]
                    }
                    else
                    {
                        return [
                            ...state,
                            {rate:10,color:'blue',key:Date.now().toString()}
                        ]
                    }
                })
            }
        },500)
        return () => {
            clearInterval(interval2);
        }
    },[])

    const removeItem = (id) => {
        console.log('hello');
        setFaces((state) => {
            return state.filter((face) => face.key !== id)
        })
    }

    return (
        <div className = 'container'>
            <div className = 'box'>
                <Timer score = {score} time = {time} />

                {/* <div className = 'faces'>
                    {
                        time > 0 && faces.map((face) => <Face removeItem = {removeItem} key = {face.key} id = {face.key} rate = {face.rate} changeFlg = {changeFlg}/>)
                    }
                </div>
                <div>
                    <button onClick = {() => changeScore()}>Click Me</button>
                </div>
                <div>
                    {time === 0 && <button onClick = {() => {setTime(og);setFaces([{rate:20,color:'red',key:d.getTime()}])}}>Reset</button>}
                </div> */}
            </div>
        </div>
    )
}
export default App;