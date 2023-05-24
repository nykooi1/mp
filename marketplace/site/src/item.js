import "./global.css";
import "./item.css";
import React from 'react';

function Item({item, handleShow, setItemDetail}) {
  
  function showItemDetail(){
    handleShow();
    setItemDetail(item);
  }
  
  return (
    <div onClick={() => showItemDetail()} className="item">
        <img src={item.images[0]}/>
        <div className="description">
            <div className="price">${item.price}</div>
            <div className="title">{item.title}</div>
            <div className="location">Los Angeles, CA</div>
        </div>
    </div>
  );
}

export default Item;