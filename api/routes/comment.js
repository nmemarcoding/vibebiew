const router = require("express").Router();
const Post = require("../models/post.js");
const User = require("../models/user.js");
const Comment = require("../models/comment.js");
const mongoose = require("mongoose");


// creat comment base on post id and user id
router.post("/", async(req, res) => {
    
    const comment = new Comment({
        postId: req.body.postId,
        userId: req.body.userId,
        desc: req.body.desc,
    });
    // cheack if userId is valid for mongoose
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).json({ error: "User id is not valid" });
    }
    // cheack if user exist
    const user = await User.findOne({
        _id: req.body.userId
    });

    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }
    // cheack if post exist
    const post = await Post.findOne({
        _id: req.body.postId
    });

    if (!post) {
        return res.status(400).json({ error: "Post does not exist" });
    }

    try {
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
        // add comment id to post comments array
        post.comments.push(savedComment._id);
        await post.save();
        
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
    
}
);






module.exports = router;