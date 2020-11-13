import React,{useState} from 'react';
import styled from 'styled-components';
import Details from './Details';

const BookCard = styled.div`
    width: 10%;
    height: 8vw;
    cursor: pointer;
    &:hover {
        width: 12%;
    }
`

const BookTitle = styled.h5`
    font-size: 1rem;
    margin: 0;
    text-align: center;
`

const CardBody = styled.div`
    padding: 2px;
`

const BookCover = styled.img`

`

function LibraryContent(props) {
    const [activeBook,setActiveBook] = useState(null)

    return (
        <>
            {props.books.map(book => {
                return <BookCard>
                    <BookCover 
                        src={`http://covers.openlibrary.org/b/id/${book.data.covers[0]}-L.jpg`} 
                        className='card-img-top'
                        alt={`cover for ${book.title}`}  
                        data-toggle='modal' 
                        data-target='detailsModal' 
                        onClick={()=>setActiveBook(book)}  
                    />
                    {/* <CardBody className='card-body'>
                        <BookTitle className='card-title'>{book.title}</BookTitle>
                    </CardBody> */}
                </BookCard>
            })}
            {activeBook && <Details book={activeBook} setActiveBook={setActiveBook}/>}
        </>
    )
}

export default LibraryContent;