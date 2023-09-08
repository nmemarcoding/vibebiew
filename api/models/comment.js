const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true,

        },
        postId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post',
            required: true,

        },
        desc: {
            type: String,
            max: 500,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Comment', commentSchema);
                        
