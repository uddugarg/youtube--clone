import React from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function DropMenu(props) {
    
    const user = useSelector(state => state.user);
    
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutHandler = () => {
        axios.get('/api/users/logout').then(response => {
            if (response.status === 200) {
                props.history.push('/login');
            } else {
                alert('Log Out Failed')
            }
        });
    }


    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <Avatar className='header__userPic' src={user.userData && user.userData.image} alt={user.userData && user.userData.email} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Link to='/login'>
                        <MenuItem>Sign in</MenuItem>
                    </Link>
                </Menu>
            </div>
        )
    } else {
        return (
            <div>
                <Avatar src={user.userData && user.userData.image} alt={user.userData && user.userData.email} className='header__userPic' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withRouter(DropMenu)
