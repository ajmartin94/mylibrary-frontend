import React,{useState} from 'react';
import {Modal} from 'react-bootstrap'

function ConfirmLibraryDeleteModal(props) {
    const [show,setShow] = useState(true)

    const handleDelete = () => {
        setShow(false)
        props.setPendDelete(null)
        props.handleDeleteLibrary()
    }

    const handleHide = () => {
        setShow(false)
        props.setPendDelete(null)
    }

    return (
        <Modal show={show} onHide={handleHide} size='sm' centered>
            <Modal.Header closeButton>
                <Modal.Title>Remove Library</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this library?</p>
            </Modal.Body>
            <Modal.Footer>
                <button type='button' className='btn btn-danger' onClick={handleDelete}>Delete</button>
            </Modal.Footer>
        </Modal>
    )  
}

export default ConfirmLibraryDeleteModal;