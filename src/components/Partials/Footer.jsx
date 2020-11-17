import React from 'react';
import styled from 'styled-components';

const StickyFooter = styled.footer`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
`

const LogoText = styled.span`
    font-family: 'Roboto Slab', serif;
`

function Footer(props) {
    return (
        <StickyFooter className='row border m-0 mt-3 bg-secondary text-light'>
            <div className='col'>
                Andrew Martin
            </div>
            <div className='col'>
                <LogoText>MyLibrary</LogoText>
            </div>
            <div className='col'>
                Submit an issue <a className='text-success' href='https://github.com/ajmartin94/mylibrary-frontend/issues'>here</a>!
            </div>
        </StickyFooter>
    )
}

export default Footer;