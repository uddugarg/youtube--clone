import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, TextField } from '@material-ui/core';
import Comment from './Comment';
import Replies from './Replies';

function Comments(props) {

    const user = useSelector(state => state.user);

    const writer = user.userData && user.userData._id;
    const postId = props.postId;

    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: comment,
            writer: writer,
            postId: postId,
        }

        axios.post('/api/comment/postComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComment('');
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to post the comment');
                }
            })
    }

    return (
        <div className='comment'>
            <h4>Comments</h4>

            <form onSubmit={handleSubmit}>
                <div className='comment__fields'>
                    <Avatar src={user.userData && user.userData.image} alt={user.userData && user.userData.email} />
                    <TextField className='comment__field' variant='standard' color='primary' type='text' label='Add a public comment'
                        value={comment} onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            </form>

            {props.comments.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <Comment key={index} comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <Replies key={index} replies={props.comments} commentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

        </div>
    )
}

export default Comments
