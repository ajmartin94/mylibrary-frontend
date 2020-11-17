import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ContainerDiv = styled.div`
    height: 100%;
`

function AllUsers(props) {
    const handleClick = () => {
        console.log('yooo')
    }

    console.log(props.users)

    return (
        <ContainerDiv className='container d-flex flex-wrap justify-content-center align-items-center'>
            {props.users.map(user=>{
                return <Link className='m-5' to={`/${user.username}`} onClick={handleClick}>
                    {user.username}
                </Link>
            })}
        </ContainerDiv>
    )
}

export default AllUsers;