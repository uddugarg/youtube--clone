import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SideVideoPosts() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos);
                } else {
                    alert('Failed to get videos');
                }
            })
    }, [])

    const renderVideoCards = videos.map((video, index) => {

        var min = Math.floor(video.duration / 60);
        var sec = Math.floor(video.duration - min / 60);

        return <div key={index} className='sidePanel'>
            <div className='sidePanel__thumbnail'>
                <a href={`/video/${video._id}`}>
                    <img className='sidePanel__img' src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
                </a>
            </div>
            <div className='sidePanel__description'>
                <a href={`/video/${video._id}`}>
                    <h6>{video.title}</h6>
                </a>
                <span>{video.writer.name}</span>
                <span>{video.views}</span>
                <span>{min}:{sec}</span>
            </div>
        </div>
    })

    return (
        <div>
            {renderVideoCards}
        </div>
    )
}

export default SideVideoPosts
