import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SlowMotionVideoOutlinedIcon from '@material-ui/icons/SlowMotionVideoOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <Link to='/'>
                    <div className='sidebar__options selected'>
                        <HomeIcon />
                        <h3>Home</h3>
                    </div>
                </Link>
                <Link to='/'>
                    <div className='sidebar__options'>
                        <WhatshotIcon />
                        <h3>Trending</h3>
                    </div>
                </Link>
                <Link to='/subscriptions'>
                    <div className='sidebar__options'>
                        <SubscriptionsIcon />
                        <h3>Subscriptions</h3>
                    </div>
                </Link>
            </div>
            <div className='sidebar__bottom'>
                <div className='sidebar__options'>
                    <VideoLibraryIcon />
                    <h3>Library</h3>
                </div>
                <div className='sidebar__options'>
                    <HistoryIcon />
                    <h3>History</h3>
                </div>
                <div className='sidebar__options'>
                    <SlowMotionVideoOutlinedIcon />
                    <h3>Your Videos</h3>
                </div>
                <div className='sidebar__options'>
                    <WatchLaterIcon />
                    <h3>Watch Later</h3>
                </div>
                <div className='sidebar__options'>
                    <ExpandMoreIcon />
                    <h3>More</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
