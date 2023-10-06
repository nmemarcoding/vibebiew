const router = require("express").Router();
const User = require("../models/user.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const mongoos = require("mongoose");
// GET ALL USERS
router.get("/users", async(req, res) => {
  try {
    const users = await User.find({}, { firstName: 1, lastName: 1, email: 1, _id: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// add friend to following list

router.put("/addfriend", async(req, res) => {
    // validate user id and friend id for mongoos

    if(!mongoos.Types.ObjectId.isValid(req.body.userId) || !mongoos.Types.ObjectId.isValid(req.body.friendId)){
        return res.status(400).json({error: "User id or friend id is not valid"});
    }
    

    const userId = req.body.userId;
    const friendId = req.body.friendId;
    //  if friend id is same as user id
    if(userId === friendId){
        return res.status(400).json({error: "You cannot follow yourself"});
    }

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if(!user || !friend){
            return res.status(400).json({error: "User or friend does not exist"});
        }

        // check if friend is already in following list 
        if(user.following.includes(friendId)){
            return res.status(400).json({error: "You already follow this user"});
        }

        // add friend to following list
        await user.updateOne({$push: {following: friendId}});
        // add user to friend followers list
        await friend.updateOne({$push: {followers: userId}});
        res.status(200).json("You are now following this user");

        

        
    } catch (err) {
        res.status(500).json(err); 
        console.log(err)
    }
}
);

//  get list of friends

router.put("/friends", async(req, res) => {

    if (!mongoos.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).json({ error: "User id is not valid" });
    }

    const userId = req.body.userId;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const friends = await Promise.all(
            user.following.map((friendId) => {
                return User.findById(friendId);
            })
        );

        let friendList = [];
        friends.map((friend) => {
            const { _id, firstName, lastName, email } = friend;
            friendList.push({ _id, firstName, lastName, email });
        });

        res.status(200).json(friendList);

    } catch (err) {
        res.status(500).json(err);
    }
}
);
// remove friend from following list

router.put("/removefriend", async(req, res) => {
    // validate user id and friend id for mongoos

    if(!mongoos.Types.ObjectId.isValid(req.body.userId) || !mongoos.Types.ObjectId.isValid(req.body.friendId)){
        return res.status(400).json({error: "User id or friend id is not valid"});
    }
    

    const userId = req.body.userId;
    const friendId = req.body.friendId;
    //  if friend id is same as user id
    if(userId === friendId){
        return res.status(400).json({error: "You cannot unfollow yourself"});
    }

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if(!user || !friend){
            return res.status(400).json({error: "User or friend does not exist"});
        }

        // check if friend is already in following list 
        if(!user.following.includes(friendId)){
            return res.status(400).json({error: "You do not follow this user"});
        }

        // remove friend from following list
        await user.updateOne({$pull: {following: friendId}});
        // remove user from friend followers list
        await friend.updateOne({$pull: {followers: userId}});
        res.status(200).json("You have unfollowed this user");

        

        
    } catch (err) {
        res.status(500).json(err); 
        console.log(err)
    }
}
);



//REGISTER
router.post("/register", async(req, res) => {
  
    const emailExist = await User.findOne({
        email: req.body.email.toLowerCase()
    });
    if (emailExist) {
        return res.status(400).json("Email already exists");
    }
    const newUser = new User({
        email: req.body.email.toLowerCase(),
        password: CryptoJS.AES.encrypt(
            req.body.password,
            "secret"
        ).toString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
       

    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

//LOGIN

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email.toLowerCase()
        });
        if (!user) {
            return res.status(401).json("Wrong username or password");
        }


        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            "secret"
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        if (originalPassword != inputPassword) {

            return res.status(401).json("Wrong username or password");

        }

        const accessToken = jwt.sign({
                id: user._id,
               
            },
            "secret", { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken });

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

});

module.exports = router;




