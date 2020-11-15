import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavTab = styled.div`
    display: flex;
    justify-content: center;
` 

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
            <Link className="navbar-brand" to="/">MyLibrary</Link>
            <NavTab>
                {props.user ?
                    <Link className='nav-link mr-2' to='#' onClick={props.handleLogout}>Log Out, {props.user.username}</Link>
                :
                    <Link className='nav-link mr-2' to='/login'>Log in</Link>
                }
                <Link className='nav-link ml-2' to='/allusers'>View All Users</Link>
            </NavTab>
        </nav>
    )
}

export default Header;
