import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import youtube from '../../images/youtube.png';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DropMenu from './DropMenu';
import { IconButton } from '@material-ui/core';
import './Header.css';
import { Link } from 'react-router-dom';



function Header(props) {

    return (
        <div className='header'>
            <IconButton className='header__hamburger'>
                <MenuIcon />
            </IconButton>
            <Link to='/'>
                <div className='header__logo'>
                    <img src={youtube} alt='youtube' width='28' height='28' />
                    <h4>YouTube<sup>IN</sup></h4>
                </div>
            </Link>
            <div className='header__searchBar'>
                <input type='text' placeholder='  Search' />
                <div className='header__searchIcon'>
                    <IconButton className='header__search'>
                        <SearchIcon />
                    </IconButton>
                </div>
            </div>
            <div className='header__icons'>
                <Link to='/upload'>
                    <VideoCallIcon className='header__icon' />
                </Link>
                <AppsIcon className='header__icon' />
                <NotificationsIcon className='header__icon' />
            </div>
            <DropMenu />
        </div>
    )
}

export default Header
