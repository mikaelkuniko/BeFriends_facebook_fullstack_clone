import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './index.css'

const Navigation = () => {
    const user = useSelector((state)=>state.session.user)
    console.log("This is user", user)


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
                <ProfileButton user={user}/>
            </div>
        </div>
    )
}

export default Navigation;
