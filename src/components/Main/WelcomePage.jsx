import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const WelcomeWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`

const LogoText = styled.span`
    font-family: 'Roboto Slab', serif;
`

function WelcomePage(props) {
    return (
        <WelcomeWrapper>
            <div className='jumbotron border'>
                <h1 className='display-4'>Welcome to <LogoText>MyLibrary</LogoText>!</h1>
                <p className='lead'>This is an app designed to help you build a library of books using OpenLibrary's huge online database. <Link to='/login'>Log in</Link> to start building your library now.</p>
            </div>
        </WelcomeWrapper>
    )
}

export default WelcomePage;