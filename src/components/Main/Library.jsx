import React,{useEffect, useState} from 'react';
import LibraryContent from './LibraryContent';
import ConfirmLibraryDeleteModal from '../Modals/ConfirmLibraryDeleteModal';
import styled from 'styled-components';
import AddLibrary from './AddLibrary'
import SearchForm from './SearchForm'
import { useParams } from 'react-router';

const LibraryDiv = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LibraryContentWrapper = styled.div`
    width: 100%;
    background-image: url('Background.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    height: 50vw;
    box-shadow: 0 0 5px 2px gray;
`

const Tab = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TrashIcon = styled.svg`
    margin-left: 10px;
    color: red;
`

const TabList = styled.ul`
    margin: 10px;
`

const ChalkboardImg = styled.img`
    height: 80%;
    position: absolute;
`
const Chalkboard = styled.div`
    width: 100%;
    height: 5vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ChalkboardTitle = styled.h4`
    font-family: 'Pangolin', cursive;
    color: #dfdfdf;
    position: absolute;
    font-size: 3vw;
    margin: 0;
`

function Library(props) {
    const [visible,setVisible] = useState(false)
    const [pendDelete,setPendDelete] = useState(null)

    const flipVisible = () => {
        setVisible(!visible)
    }

    const handleClick = (id) => {
        console.log(id)
        props.setActiveLibraryID(id)
    }

    const handleDelete = () => {
        props.handleDeleteLibrary(pendDelete)
        setPendDelete(null)

    }
    const {username} = useParams()
    
    useEffect(()=>{
        if (props.otherUser) {
            props.getUserData(username)
        }
    },[username])

    return (
        <>
            {!props.otherUser &&
                <SearchForm 
                    handleAddToLibrary={props.handleAddToLibrary}
                />
            }
            <LibraryDiv>
                <TabList className='nav nav-tabs' id='libraryTabs' role='tablist'>
                    {props.libraryData && props.libraryData.map((library,index) => {
                        return (
                            <li key={index} className='nav-item' role='presentation'>
                                <Tab
                                    className={library.id===props.activeLibraryID ? 'nav-link active' : 'nav-link'}
                                    data-toggle='tab'
                                    role='tab'
                                    aria-controls={'tab'+index}
                                    aria-selected={index===0 ? 'true' : 'false'}
                                    onClick={()=>handleClick(library.id)}
                                >  
                                    <div>
                                    {library.name} 
                                    </div>
                                    
                                    <TrashIcon 
                                        width="1em" 
                                        height="1em" 
                                        viewBox="0 0 16 16" 
                                        className="bi bi-trash" 
                                        fill="currentColor" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        data-toggle='modal'
                                        data-target='#confirmModal'
                                        onClick={()=>setPendDelete(library.id)}
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </TrashIcon>
                                </Tab>
                            </li>
                        )
                    })}
                    {!props.otherUser &&
                        <li className='nav-item' role='presentation'>
                            <Tab 
                                className='nav-link'
                                onClick={visible ? null : flipVisible}
                            >
                                {visible ? 
                                    <AddLibrary user={props.user} setVisible={setVisible} handleAddNewLibrary={props.handleAddNewLibrary}/>
                                : 
                                    '+ Add New Library'
                                }
                            </Tab>
                        </li>
                    }
                </TabList>
                <LibraryContentWrapper className='tab-content' id='libraryContent'>
                    <Chalkboard>
                        <ChalkboardImg src='Chalkboard.png' />
                        <ChalkboardTitle>{props.otherUser ? username : props.user.username}'s Library</ChalkboardTitle>
                    </Chalkboard>
                    {props.libraryData && props.libraryData.map((library,index)=>{
                        return <div 
                            className={library.id===props.activeLibraryID ? 'tab-pane fade show active' : 'tab-pane fade'}
                            id={'tab'+index}
                            role='tabpanel'
                            aria-labelledby={'tab'+index}
                        >
                            <LibraryContent 
                                books={library.books} 
                                handleRemoveBook={props.handleRemoveBook}
                            />
                        </div>
                    })
                    }
                </LibraryContentWrapper>
            </LibraryDiv>
            {pendDelete && <ConfirmLibraryDeleteModal setPendDelete={setPendDelete} handleDeleteLibrary={()=>props.handleDeleteLibrary(pendDelete)} />}
        </>
    )
}

export default Library;