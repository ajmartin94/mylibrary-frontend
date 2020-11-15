import React,{useState} from 'react';
import styled from 'styled-components';
import Details from './Details';

const LibraryContentDiv = styled.div`
    width: 100%;
    padding-top: 5vw;
`

const ShelfDiv = styled.div`
    width: 100%;
    height: 11vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .5vw 0;
    padding: 0 10px;
`

const BookCard = styled.div`
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    max-height: 9vw;
    width: auto;
    max-width: 90%;    
    cursor: pointer;
    &:hover {
        max-height: 10vw;
        max-width: 100%;
    }
`

function LibraryContent(props) {
    const [activeBook,setActiveBook] = useState(null)

    const numberOfShelves = (Math.floor(props.books.length/10)+1)
    const mappableArray = []
    for (let i = 1; i <= numberOfShelves; i++) {
        mappableArray.push(i)
    }

    return (
        <LibraryContentDiv>
            {mappableArray.map(shelfNumber => {
                return <ShelfDiv>
                    {props.books.map((book,index) => {
                        if (index >= (shelfNumber-1)*10 && index < shelfNumber*10) {
                            return <BookCard>
                                <BookCover 
                                    src={`http://covers.openlibrary.org/b/id/${book.data.covers[0]}-L.jpg`} 
                                    className='card-img-top'
                                    alt={`cover for ${book.title}`}  
                                    data-toggle='modal' 
                                    data-target='detailsModal' 
                                    onClick={()=>setActiveBook(book)}  
                                />
                            </BookCard>
                        } 
                    })}
                </ShelfDiv>
            })}
            
            {activeBook && <Details book={activeBook} setActiveBook={setActiveBook}/>}
        </LibraryContentDiv>
    )
}

export default LibraryContent;