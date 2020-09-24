import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, TextField } from '@material-ui/core';
import './Video.css';
import { useSelector } from 'react-redux';
import LikesDislikes from './LikesDislikes';

function Comment(props) {

    const user = useSelector(state => state.user);

    const [reply, setReply] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: reply,
        }

        axios.post('/api/comment/postComment', variable)
            .then(response => {
                if (response.data.success) {
                    setReply('');
                    setOpen(!open);
                    props.refreshFunction(response.data.result);
                } else {
                    alert('Failed to reply');
                }
            })
    }

    return (
        <div className='comment__list'>
            <Avatar className='comment__img' src={props.comment.writer.image} alt={props.comment.writer.name} />
            <div className='comment__info'>
                <h4>{props.comment.writer.name}</h4>
                <p>{props.comment.content}</p>
                <div className='comment__actions'>
                    <LikesDislikes commentId={props.comment._id} />
                    {!props.responseTo &&
                        <span onClick={handleOpen} className='comment__actionBtn'>Reply</span>
                    }
                </div>
                {open &&
                    <form onSubmit={handleSubmit}>
                        <TextField className='comment__replyField' variant='standard' color='primary' type='text' label='Add a reply'
                            value={reply} onChange={(e) => setReply(e.target.value)}
                        />
                    </form>
                }
            </div>
        </div>
    )
}

export default Comment
