import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { IconButton } from '@material-ui/core';
import './Video.css';
import { useSelector } from 'react-redux';

function LikesDislikes(props) {

    const user = useSelector(state => state.user);

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(null);
    const [dislikes, setDislikes] = useState(0);
    const [disliked, setDisliked] = useState(null);

    let variable = {}

    if (props.videos) {
        variable = {
            writer: user.userData && user.userData._id,
            postId: props.postId,
        }
    } else {
        variable = {
            writer: user.userData && user.userData._id,
            commentId: props.commentId,
        }
    }

    useEffect(() => {

        let writer = user.userData && user.userData._id;

        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length);
                    response.data.likes.map(like => {
                        if (like.writer === writer) {
                            setLiked('liked');
                        }
                    })
                } else {
                    alert('Unable to like the post!');
                }
            })

        axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    setDislikes(response.data.dislikes.length);
                    response.data.dislikes.map(dislike => {
                        if (dislike.writer === writer) {
                            setDisliked('disliked');
                        }
                    })
                } else {
                    alert('Unable to dislike the post!');
                }
            })
    }, [])


    const handleLike = () => {
        if (liked === null) {
            axios.post('/api/like/postLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes + 1);
                        setLiked('liked');

                        if (disliked !== null) {
                            setDislikes(dislikes - 1);
                            setDisliked(null);
                        }
                    } else {
                        alert('Unable to like the post');
                    }
                })
        } else {
            axios.post('/api/like/deleteLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes - 1);
                        setLiked(null);
                    } else {
                        alert('Unable to decrease the like');
                    }
                })
        }
    }


    const handleDislike = () => {
        if (disliked !== null) {
            axios.post('/api/like/deleteDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(dislikes - 1);
                        setDisliked(null);
                    } else {
                        alert('unable to dislike the post')
                    }
                })
        } else {
            axios.post('/api/like/postDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(dislikes + 1);
                        setDisliked('disliked');

                        if (liked !== null) {
                            setLikes(likes - 1);
                            setLiked(null);
                        }
                    } else {
                        alert('unable to decrease the dislike')
                    }
                })
        }
    }



    return (
        <div className={!props.commentId ? 'video__btns' : 'comment__actions'}>
            <IconButton className={!props.commentId && 'video__btn'} onClick={handleLike}>
                <ThumbUpAltIcon className={liked !== 'liked' ? 'video__actionBtn' : 'video__actionDoneBtn'} fontSize={props.commentId && 'small'} />
            </IconButton>
            <span className={!props.commentId ? 'video__btnNum' : 'comment__btnNum'}>{likes}</span>
            <IconButton className={!props.commentId && 'video__btn'} onClick={handleDislike}>
                <ThumbDownIcon className={disliked !== 'disliked' ? 'video__actionBtn' : 'video__actionDoneBtn'} fontSize={props.commentId && 'small'} />
            </IconButton>
            <span className={!props.commentId ? 'video__btnNum' : 'comment__btnNum'}>{dislikes}</span>
            {!props.commentId &&
                <IconButton className='video__btn'>
                    <ShareIcon className='video__actionBtn' />
                </IconButton>
            }
            {!props.commentId &&
                <IconButton className='video__btn'>
                    <SaveAltIcon className='video__actionBtn' />
                </IconButton>
            }
        </div>
    )
}

export default LikesDislikes
