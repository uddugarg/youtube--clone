import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core'
import './Video.css';
import { useSelector } from 'react-redux';

function Subscriber(props) {

    const user = useSelector(state => state.user)

    const userSubscribers = props.userSubscribers;
    const userSubscribed = user.userData && user.userData._id;

    const [subscribers, setSubscribers] = useState(0);
    const [subscribed, setSubscribed] = useState(false);


    const handleSubscribe = () => {

        let variable = {
            userSubscribers: userSubscribers,
            userSubscribed: userSubscribed
        }

        if (subscribed) {
            axios.post('/api/subscribe/unSubscribe', variable)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data.doc);
                        setSubscribers(subscribers - 1)
                        setSubscribed(!subscribed)
                    } else {
                        alert('failed to unsubscribe');
                    }
                })
        } else {
            axios.post('/api/subscribe/subscribe', variable)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data.doc);
                        setSubscribers(subscribers + 1)
                        setSubscribed(!subscribed)
                    } else {
                        alert('failed to subscribe');
                    }
                })
        }
    }

    useEffect(() => {

        const variable = {
            userSubscribers: userSubscribers,
            userSubscribed: userSubscribed
        }

        axios.post('/api/subscribe/subscribers', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribers(response.data.subscribers.length);
                } else {
                    alert('Failed To Subscribe!')
                }
            })

        axios.post('/api/subscribe/subscribed', variable)
            .then(response => {
                if (response.data.success) {
                    if (response.data.subscribed.length !== 0)
                        setSubscribed(response.data.subscribed);
                } else {
                    alert('Failed to get the subscriber info');
                }
            })

    }, [])
    

    if (user.userData._id !== userSubscribers) {
        return (
            <div>
                <Button className={subscribed ? 'video__subscribed' : 'video__submitBtn'} variant='contained' type='submit' onClick={handleSubscribe}>
                    {subscribers} {subscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }

}

export default Subscriber
