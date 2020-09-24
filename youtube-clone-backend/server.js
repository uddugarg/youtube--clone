const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/key');

const connent = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static('youtube-clone/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'youtube-clone', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server's Running on ${port}`);
});