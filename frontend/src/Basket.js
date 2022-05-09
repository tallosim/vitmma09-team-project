import React from "react";
import Item from "./Item";

function Basket({person, items}){

    return(
        <div className="basket">
            <p>{person}</p>
            {items.maps(item =>(
                <Item name={item.name} price={item.price}/>
            ))}
        </div>
    )
};

export default Basket;