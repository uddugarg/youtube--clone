const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { Video } = require('../models/Video');
const { Subscribers } = require('../models/Subscribers');

const { auth } = require('../middleware/auth');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('Only mp4 file are accepted'), false);
        }
        cb(null, true)
    },
})

var upload = multer({ storage: storage }).single('file');

router.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        let filePath = res.req.file.path.replace(/\\/g, '/');
        if (err)
            return res.json({ success: false, err });
        return res.json({ success: true, filePath: filePath, fileName: res.req.file.filename });
    })
})


router.post('/thumbnail', (req, res) => {

    let thumbsFilePath = '';
    let thumbsFileDuration = '';

    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        thumbsFileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = 'uploads/thumbnails/' + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({
                success: true,
                thumbsFilePath: thumbsFilePath,
                thumbsFileDuration: thumbsFileDuration
            })
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            timestamps: [30.5, '50%', '01:10.123'],
            filename: 'thumbnail-%b.png',
            size: '300x240'
        });
})

router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body);

    video.save((err, video) => {
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    })
})

router.get('/getVideos', (req, res) => {
    Video.find()
        .sort({ "createdAt": -1 })
        .populate('writer')
        .exec((err, videos) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).json({ success: true, videos });
        })
})

router.post('/getVideo', (req, res) => {
    Video.findOne({ '_id': req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).json({ success: true, video });
        })
})

router.post('/getSubscribedVideos', (req, res) => {
    Subscribers.find({ "userSubscribed": req.body.userSubscribed })
        .exec((err, subscribed) => {
            if (err)
                return res.status(400).send(err);

            let subscribedUsers = [];
            subscribed.map((subscribe, i) => {
                subscribedUsers.push(subscribe.userSubscribers)
            })

            Video.find({ writer: { $in: subscribedUsers } })
                .sort({"createdAt": -1})
                .populate('writer')
                .exec((err, videos) => {
                    if (err)
                        return res.status(400).send(err);
                    return res.status(200).json({ success: true, videos });
                })
        })
})

module.exports = router;