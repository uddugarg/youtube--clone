import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, CardMedia } from '@material-ui/core';
import '../App.css';

function SubscriptionsPage() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {

        let variable = {
            userSubscribed: localStorage.getItem('userId')
        }

        axios.post('/api/video/getSubscribedVideos', variable)
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos);
                } else {
                    alert('Failed to get Subscribed Videos');
                }
            })
    }, [])

    const renderVideoCards = videos.map((video, index) => {

        var min = Math.floor(video.duration / 60);
        var sec = Math.floor(video.duration - min / 60);

        return <Card key={index} className='home__videoCard'>
            <Link to={`/video/${video._id}`}>
                <CardMedia className='home__cardImg'
                    image={`http://localhost:5000/${video.thumbnail}`}
                    title={video.title}
                >
                    <div className='home__cardDuration'>
                        <span>{min}:{sec}</span>
                    </div>
                </CardMedia>
            </Link>
            <CardContent className='home__cardContent'>
                <div className='home__cardDetails'>
                    <Avatar className='home__cardDp' src={video.writer.image} alt={video.writer.name} />
                    <Link to={`/video/${video._id}`}>
                        <h4>{video.title}</h4>
                    </Link>
                </div>
                <h5>{video.writer.name}</h5>
                <h5>{video.views}<span>{moment(video.createdAt).format('MMM Do YY')}</span></h5>
            </CardContent>
        </Card>
    })

    return (
        <div className='home__subscriptions'>

            <div className='home__videoPage'>
                <h3>Subscriptions</h3>
                <hr />

                <div className='home__videoSubscriptionCards'>
                    {renderVideoCards}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionsPage
