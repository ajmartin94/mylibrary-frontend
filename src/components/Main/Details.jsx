import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'

const CoverImg = styled.img`
    height: 20vw;
    margin: 15px auto;
    box-shadow: 0 0 10px 5px black;
`

const CarouselItem = styled.div`
    border-radius: 10px;
`

function Details(props) {
    const [show,setShow] = useState(true)

    const handleClose = () => {
        setShow(false)
        props.setActiveBook(null)
    }

    return (
        <Modal show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.book.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="coversCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {props.book.data.covers.map((cover,index) => {
                            return (
                                <li 
                                    data-target="#coversCarousel" 
                                    data-slide-to={index} 
                                    className={index===0 ? "active" : ''}
                                ></li>
                            )
                        })}
                    </ol>
                    <div className='carousel-inner'>
                        {props.book.data.covers.map((cover,index) => {
                            return (
                                <CarouselItem 
                                    className={index===0 ? 'carousel-item bg-dark active' : 'carousel-item bg-dark'}
                                >
                                    <CoverImg    
                                        className='d-block'
                                        src={`http://covers.openlibrary.org/b/id/${cover}-L.jpg`}
                                        alt={`slide ${index}`}
                                    />
                                </CarouselItem>
                            )
                        })}
                    </div>
                    <a className="carousel-control-prev" href="#coversCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#coversCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <h5>Description:</h5>
                <p className='text-muted'>
                    {typeof props.book.data.description === 'string' ?
                        props.book.data.description
                    :
                        props.book.data.description.value
                    }
                </p>
            </Modal.Body>
        </Modal>
    )
}

export default Details;