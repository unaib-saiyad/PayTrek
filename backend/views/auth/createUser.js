User = require("../../models/auth/User");
const bcrypt = require("bcryptjs");

createUser = async function(req, res){
    try {
        const { username, email, password, tag, profileImage } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword, tag, profileImage });
        await newUser.save();
        
        res.json({ status: true, message: "user created successfully...", user: newUser});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = createUser;