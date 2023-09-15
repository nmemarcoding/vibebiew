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
router.get("/timeline/:userId", async (req, res) => {
    // check if userId is valid for mongoose
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ error: "User id is not valid" });
    }
    // find all of the user posts base on user id and populate userId without password
    const post = await Post.find({
        userId: req.params.userId
    }).populate({
        path: "userId",
        select: "-password"
    }).populate({
        path: "comments",
        populate: {
            path: "userId",
            select: "-password"
        }
    });

    try {
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});






module.exports = router;