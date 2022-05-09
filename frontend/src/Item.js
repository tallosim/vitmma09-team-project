import React from "react";

function Item({name, price}){
    
    return(
        <div className="item">
            <p>{name}</p>
            <p>{price}</p>
        </div>
    );
};

export default Item;