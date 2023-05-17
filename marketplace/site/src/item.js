import "./global.css";
import "./item.css";

function Item({imgURL, price, title, location}) {
  return (
    <div className="item">
        <img src={imgURL}/>
        <div className="description">
            <div className="price">{price}</div>
            <div className="title">{title}</div>
            <div className="location">{location}</div>
        </div>
    </div>
  );
}

export default Item;