const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_secret = "TruecopyA4sizepaper";


//::: Signup Function use (POST 'api/auth/createanewuser')
router.post('/createanewuser', [
    body("password", "Enter a valid Password: ").isLength({ min: 8 }),
    body("email", "Enter a valid email: ").isEmail(),
    body("name", "Enter a name (contains only strings").isLength({ min: 3 })
], async (req, res) => {
    const success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ sucess: success, error: "Already a user exist with the same email" });
        }

        const salt = await bcrypt.genSalt(10);
        const Secret_pwd = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: Secret_pwd
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        res.json({ success: true, authtoken: authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error has been occured internally");
    }
})

//::: Login function (POST 'api/auth/userlogin')
router.post('/userlogin', [
    body('email', "Enter a Valid email: ").isEmail(),
    body("password", "Enter The password Correctly").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: success, error: "Please try with correct credentials" });
        }
        const pwdcompare = await bcrypt.compare(password, user.password);
        if (!pwdcompare) {
            return res.status(400).json({ success: success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_secret);
        success = true;
        res.json({ success: success, authtoken: authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some internal issue is there")
    }
})

//:::; Get loggedin user using : (POST 'api/auth/getauser')
router.get('/getauser',fetchuser,async(req,res)=>{
    try {
        const userid=req.user.id;
        const user=await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some internal fault is present")
    }
})

module.exports = router;