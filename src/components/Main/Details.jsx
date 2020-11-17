import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'
import ConfirmBookDeleteModal from '../Modals/ConfirmBookDeleteModal';
import StarRatings from 'react-star-ratings';

const CoverImg = styled.img`
    height: 20vw;
    margin: 15px auto;
    box-shadow: 0 0 10px 5px black;
`

const CarouselItem = styled.div`
    border-radius: 10px;
`

const TrashIcon = styled.svg`
    margin-right: 10px;
    color: red;
    cursor: pointer;
`

const StarWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: .75vw 0;
    padding: 0 2vw;
`
const StarDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Details(props) {
    const [show,setShow] = useState(true)
    const [pendDelete,setPendDelete] = useState(null)
    const [userRating,setUserRating] = useState(0)
    const [averageRating,setAverageRating] = useState(0)
    const [existingRatingId,setExistingRatingId] = useState(null)

    const handleClose = () => {
        setShow(false)
        props.setActiveBook(null)
    }

    const changeRating = (rating) => {
        if (existingRatingId) {
            props.handleUpdateRating(existingRatingId,rating)
        } else {
            props.handleAddRating(props.book.id,rating)
        }
        setShow(false)
        setUserRating(rating)
        setShow(true)
    }

    useEffect(()=>{
        if (props.book.ratings.length > 0) {
            const findAverage = props.book.ratings.reduce((sum,ratingSet)=> {
                return sum + ratingSet.rating
            }, 0)/props.book.ratings.length
            setAverageRating(findAverage);

            let findUserRating = 0;
            let existingId = null;
            try {
                const findUserRatingObject = props.book.ratings.find(ratingSet => ratingSet.userid.username === props.username)
                findUserRating = findUserRatingObject.rating
                existingId = findUserRatingObject.id
            } catch (err) {
                findUserRating = 0;
            }
        
            setUserRating(findUserRating)
            setExistingRatingId(existingId)
        }
    })

    let description = '';  
    if (props.book.data.description && typeof props.book.data.description === 'string') {
        description = props.book.data.description
    } else if (props.book.data.description && typeof props.book.data.description.value !== 'undefined') {
        description = props.book.data.description.value
    } else {
        description = 'No description provided'
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex justify-content-between align-items-center w-100'>
                        {props.book.title}
                    
                        <TrashIcon 
                            width="2em" 
                            height="2em" 
                            viewBox="0 0 16 16" 
                            className="bi bi-trash" 
                            fill="currentColor" 
                            xmlns="http://www.w3.org/2000/svg" 
                            onClick={()=>setPendDelete(props.book.id)}
                        >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </TrashIcon>
                    </Modal.Title>
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
                    <StarWrapper>
                        <StarDiv>
                            <h6>User Rating:</h6>
                            <StarRatings 
                                rating={userRating} 
                                starRatedColor='purple' 
                                changeRating={!props.otherUser && changeRating} 
                                numberOfStars={5} name='userRating'
                                starDimension='2vw'
                            />
                        </StarDiv>
                        <StarDiv>
                            <h6>Average Rating:</h6>
                            <StarRatings 
                                rating={averageRating} 
                                starRatedColor='purple' 
                                numberOfStars={5} name='averageRating'
                                starDimension='2vw'
                            />
                        </StarDiv>
                    </StarWrapper>
                    
                    <h5>Description:</h5>
                    <p className='text-muted'>
                        {description}
                    </p>
                </Modal.Body>
            </Modal>
            {pendDelete && <ConfirmBookDeleteModal setPendDelete={setPendDelete} handleRemoveBook={()=>props.handleRemoveBook(props.book.id)} />}
        </>
    )
}

export default Details;