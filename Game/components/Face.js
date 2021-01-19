import React from 'react';
let interval = null;
const Face = (props) => {
    const [pos,setPos] = React.useState(90);
    
    React.useEffect(() => {
        interval = setInterval(() => {
            
                
            setPos((pos) => {
                // console.log(pos)
                if(pos > 0 && pos <= 20 )
                {
                    props.changeFlg(1);
                }
                else if(pos < 0)
                {
                    props.changeFlg(0);
                    props.removeItem(props.id)  
                }
                return pos - props.rate
            })
        },500)
        return () => {
            clearInterval(interval)
        }
    },[])
    return (
        <div className = 'face' style = {{left:`${pos}%`}}>

        </div>
    )
}
export default Face;