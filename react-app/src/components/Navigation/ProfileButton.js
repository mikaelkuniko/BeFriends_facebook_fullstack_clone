import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        setShowMenu(false)
        history.push("/");
    };

    return (
        <>
            <button onClick={openMenu} className="nav-icon" id="profile-icon">
                {!user.profile_pic && (
                    <i class="fa-regular fa-user" id='profile-pic'></i>
                )}
            </button>

            {showMenu && (
                <ul className="profile-dropdown">
                    <div>
                        <h4>{user.first_name} {user.last_name}</h4>
                    </div>
                    <button onClick={logout} className='prof-buttons'>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <p className="button-text">Log Out</p>
                    </button>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
