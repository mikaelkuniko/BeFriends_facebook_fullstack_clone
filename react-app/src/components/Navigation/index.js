import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './index.css'

const Navigation = () => {


    return (
        <div className='nav-div'>
            <div className='left-nav'>
                <NavLink exact to='/homepage' id='home'>
                    BeFriends
                </NavLink>
                {/* <div>Search</div> */}
            </div>
            {/* <div className='mid-nav'>links?</div> */}
            <div className='right-nav'>
                Profile Button
            </div>
        </div>
    )
}

export default Navigation;
