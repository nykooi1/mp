import react, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactDOM from "react-dom";

const EditProfileModal = ({show, onHide, email}) => {

    return (
        <Modal 
            show={show}
            onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title> Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"> placeholder={email} </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* Add your modal body content here */}
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;

