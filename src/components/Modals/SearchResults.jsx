import React,{useState} from 'react';
import styled from 'styled-components';
import {Modal} from 'react-bootstrap';

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
`

const CardContent = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
`

function SearchResults(props) {
    const [show,setShow] = useState(true)

    const handleAdd = (key) => {
        setShow(false)
        props.setSearchData(null)
        props.handleAddToLibrary(key)
    }

    return (
        <Modal show={show} onHide={()=>setShow(false)} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Search results...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CardWrapper>
                    {props.searchData.map((result,index) => {
                        return (
                            <div className='card w-25' key={index}>
                                <CardContent className='card-body'>
                                    <div>
                                        <h5 className='card-title'>{result.title_suggest}</h5>
                                        <h6 className='card-subtitle mb-2 text-muted'>{result.author_name}</h6>
                                    </div>
                                    <button 
                                        onClick={()=>handleAdd(result.key)} 
                                        className='btn btn-info'
                                    >Add to Library</button>
                                </CardContent>
                            </div>
                        )
                    })}
                </CardWrapper>
            </Modal.Body>
        </Modal>
    )
}

export default SearchResults;