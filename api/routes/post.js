const router = require("express").Router();
const Post = require("../models/post.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
//CREATE POST
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
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
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// get rout to get post of a user and all of their followings
router.get("/timeline/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: req.params.userId }).populate({ path: "userId", select: "firstName lastName" });
        // map over all user posts and check if commment exist populate the comment with the user info
        const userPostsWithComments = await Promise.all(
            userPosts.map(async(post) => {
                const comments = await Promise.all(
                    post.comments.map(async(comment) => {
                        const commentWithUser = await comment.populate({ path: "userId", select: "firstName lastName" }).execPopulate();
                        return commentWithUser;
                    })
                );
                return { ...post._doc, comments };
            })
        );
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        // map over all friend posts and check if commment exist populate the comment with the user info
        const friendPostsWithComments = await Promise.all(
            friendPosts.map(async(post) => {
                const comments = await Promise.all(
                    post.comments.map(async(comment) => {
                        const commentWithUser = await comment.populate({ path: "userId", select: "firstName lastName" }).execPopulate();
                        return commentWithUser;
                    })
                );
                return { ...post._doc, comments };
            })
        );
        res.status(200).json(userPostsWithComments.concat(...friendPostsWithComments));

        
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;