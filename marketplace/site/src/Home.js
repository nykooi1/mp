import React, { useState, useEffect } from 'react';
import ItemDetail from "./itemDetail";
import Container from 'react-bootstrap/Container';
import "./global.css";
import "./itemGrid"
import ItemGrid from './itemGrid';


function Home() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [itemDetail, setItemDetail] = useState([]);

    const [items, setItems] = useState([]);

    async function getItems(){
        const response = await fetch('http://localhost:3001/getItems'); // Replace with your API endpoint
        const jsonData = await response.json();  

        setItems(jsonData);
        console.log(jsonData);
    }

    useEffect(() => {
        getItems();
      }, []);

    return (
        <Container>
            {/* populate items */}
            <ItemGrid items={items} handleShow={handleShow} setItemDetail={setItemDetail}></ItemGrid>

            {/* pop-up modal */}
            <ItemDetail show={show} handleClose={handleClose} detail={itemDetail}></ItemDetail>
        </Container>
          
    );

}

export default Home;