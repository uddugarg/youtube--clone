const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribersSchema = mongoose.Schema({
    userSubscribers: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userSubscribed: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
})

const Subscribers = mongoose.model('Subscribers', subscribersSchema);

module.exports = { Subscribers }