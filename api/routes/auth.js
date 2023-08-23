const router = require("express").Router();
const User = require("../models/user.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



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