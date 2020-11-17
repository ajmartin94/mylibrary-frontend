import React,{useState} from 'react';
import axios from 'axios';
import SearchResults from '../Modals/SearchResults';
import styled from 'styled-components';

const Form = styled.form`
    margin: 20px;
` 

function SearchForm(props) {
    const [searchCriteria,setSearchCriteria] = useState('')
    const [searchData,setSearchData] = useState(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const encodedSearchCriteria = encodeURI(searchCriteria);
        axios.get(`http://openlibrary.org/search.json?title=${encodedSearchCriteria}`)
        .then(resp => {
            const relevant_data = resp.data.docs.slice(0,10)
            setSearchData(relevant_data)
        })
    }

    const handleChange = (e) => {
        setSearchCriteria(e.target.value);
    }

    return (
        <>
            <Form className='form-inline' onSubmit={(e)=>handleSearch(e)}>
                <input 
                    type='text' 
                    className='form-control mb-2 mr-sm-2' 
                    id='search' 
                    placeholder='find a book' 
                    onChange={(e)=>handleChange(e)}
                />
                <button type='submit' className='btn btn-success mb-2'>Search</button>
            </Form>
            {searchData && <SearchResults searchData={searchData} handleAddToLibrary={props.handleAddToLibrary} setSearchData={setSearchData} />}
        </>
    )
}

export default SearchForm;