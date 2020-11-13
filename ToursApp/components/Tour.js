import React from "react";

const Tour = ({name,image,price,description}) =>{
    return(
        <div>
            <div>
                <img src = {image}/>
            </div>
            <div>
                <div>
                    <h4>{name}</h4>
                    <h3>$ {price}</h3>
                </div>
                <div>
                    <p>
                        {description}
                    </p>
                </div>
                <div>
                    <button type = 'button'>Not Interested</button>
                </div>
            </div>
        </div>
    )
}
export default Tour;