import React from 'react';
import styled from 'styled-components';

const StickyFooter = styled.footer`
    width: 100%;
    height: 60px;
`

function Footer(props) {
    return (
        <StickyFooter>
            <div className='text-muted'>
                This is the footer
            </div>
        </StickyFooter>
    )
}

export default Footer;