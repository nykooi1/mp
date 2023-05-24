import React from 'react';
import Item from "./item";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ItemGrid({ items, handleShow, setItemDetail}) {
  const rows = [];
  const itemsPerRow = 4;

  // Group items into rows
  for (let i = 0; i < items.length; i += itemsPerRow) {
    const rowItems = items.slice(i, i + itemsPerRow);
    rows.push(rowItems);
  }

  return (
    <div className="container">
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, itemIndex) => (
            <Col className="mb-4" xs={6} lg={3}>
                <Item key={itemIndex} item={item} handleShow={handleShow} setItemDetail={setItemDetail}></Item>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default ItemGrid;
