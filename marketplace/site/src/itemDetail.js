import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./global.css";
import "./item.css";
import ImageSlider from "./itemImageSlider";

function ItemDetail({show, detail, handleClose}){

    return(
        <Modal fullscreen={true} className="modal-full" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <Row className="imageSlider">
                <Col lg={9}>
                    <ImageSlider images={detail.images}></ImageSlider>
                </Col>
                <Col className="itemDetail" lg={3}>
                    <h1>{detail.title}</h1>
                    <h2>${detail.price}</h2>
                    <p>Listed 3 weeks ago in Blue Springs, MO</p>
                    <h1>Details</h1>
                    <Row>
                      <Col><h2>Condition</h2></Col>
                      <Col><p className="float-end">{detail.condition}</p></Col>
                    </Row>
                    <Row>
                      <Col><h2>Brand</h2></Col>
                      <Col><p className="float-end">{detail.brand}</p></Col>
                    </Row>
                    <Row>
                      <Col><h2>Description:</h2><p>{detail.description}</p></Col>
                    </Row>
                </Col>
            </Row>
        </Modal.Body>
      </Modal>
    );
}

export default ItemDetail;