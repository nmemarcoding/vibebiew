const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,

        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
            default: '',
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'

            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);
