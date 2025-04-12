const User = require('../../models/auth/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


Login = async (req, res) => {
    const {email, password} = req.body;
    try{
        let user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json({error: "Credentials does not match!..."});
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return res.status(400).json({error: "Credentials does not match!..."});
        }
        const data = {
            user: {
                id: user.id
            }
        };
        var token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ status: true, message: "user login successfully...", token: token});

    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Some error occured!..."});
    }
};

module.exports = Login;