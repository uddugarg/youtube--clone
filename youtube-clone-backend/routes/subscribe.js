const express = require('express');
const router = express.Router();

const { Subscribers } = require('../models/Subscribers');

const { auth } = require('../middleware/auth');


router.post('/subscribers', (req, res) => {
    Subscribers.find({ "userSubscribers": req.body.userSubscribers })
        .exec((err, subscribe) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, subscribers: subscribe })
        })
})

router.post('/subscribed', (req, res) => {
    Subscribers.find({ "userSubscribers": req.body.userSubscribers, "userSubscribed": req.body.userSubscribed })
        .exec((err, subscribe) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, subscribed: subscribe });
        })
})

router.post('/subscribe', (req, res) => {
    const subscribe = new Subscribers(req.body);

    subscribe.save((err, doc) => {
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
    })
})

router.post('/unSubscribe', (req, res) => {
    Subscribers.findOneAndDelete({
        'userSubscribers': req.body.userSubscribers,
        'userSubscribed': req.body.userSubscribed
    }).exec((err, doc) => {
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
    })
})


module.exports = router