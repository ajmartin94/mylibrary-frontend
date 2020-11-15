import React,{useState} from 'react';
import {Modal} from 'react-bootstrap'

function ConfirmBookDeleteModal(props) {
    const [show,setShow] = useState(true)

    const handleDelete = () => {
        setShow(false)
        props.setPendDelete(null)
        props.handleRemoveBook()
    }

    const handleHide = () => {
        setShow(false)
        props.setPendDelete(null)
    }

    return (
        <Modal show={show} onHide={handleHide} size='sm' centered>
            <Modal.Header closeButton>
                <Modal.Title>Remove Book from Library</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this book from this library?</p>
            </Modal.Body>
            <Modal.Footer>
                <button type='button' className='btn btn-danger' onClick={handleDelete}>Delete</button>
            </Modal.Footer>
        </Modal>
    )  
}

export default ConfirmBookDeleteModal;