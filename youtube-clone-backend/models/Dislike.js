const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, {
    timestamps: true,
})


const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }