import React from 'react';
import {Link} from 'react-router-dom';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
            <Link className="navbar-brand" to="/">MyLibrary</Link>
            {props.user ?
                <Link className='nav-link' to='#' onClick={props.handleLogout}>Log Out, {props.user.username}</Link>
            :
                <Link className='nav-link' to='/login'>Log in</Link>
            }
        </nav>
    )
}

export default Header;
