import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import SideVideoPosts from './SideVideoPosts';
import Subscriber from './Subscriber';
import Comments from './Comments';
import { Avatar, IconButton } from '@material-ui/core';
import './Video.css';
import LikesDislikes from './LikesDislikes';

function VideoPosts(props) {

    const videoId = props.match.params.videoId;

    const [videos, setVideos] = useState('');
    const [comments, setComments] = useState([]);

    const variable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video);
                    setVideos(response.data.video);
                } else {
                    alert('Failed to get videos');
                }
            })

        axios.post('/api/comment/getComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert('Failed to get videos');
                }
            })
    }, [])

    const updateComment = (comment) => {
        setComments(comments.concat(comment))
    }


    if (videos.writer) {
        return (
            <div className='video'>
                <div className='video__left'>
                    <div className='video__arena'>
                        <video src={`http://localhost:5000/${videos.filePath}`} controls></video>
                        <h2>{videos.title}</h2>
                        <p>{videos.views} views | <span>{moment(videos.createdAt).format('MMM Do YY')}</span></p>
                        <LikesDislikes videos={videos} postId={videos._id} />
                    </div>
                    <hr className='video__hr' />
                    <div className='video__details'>
                        <Avatar src={videos.writer.image} alt={videos.writer.name} />
                        <h3>{videos.writer.name}</h3>
                        <Subscriber
                            userSubscribers={videos.writer._id}
                        />
                    </div>
                    <hr className='video__hr' />
                    <div className='video__description'>
                        <p>{videos.description}</p>
                    </div>
                    <hr className='video__hr' />
                    <div className='video__comments'>
                        <Comments comments={comments} postId={videos._id} refreshFunction={updateComment} />
                    </div>
                </div>

                <div className='video__right'>
                    <SideVideoPosts />
                </div>
            </div>
        )
    } else {
        return (
            <div className='video'>Loading....</div>
        )
    }
}

export default VideoPosts
