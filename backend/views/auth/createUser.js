User = require("../../models/auth/User");

createUser = async function(req, res){
    try {
        const { username, email, password, tag, profileImage } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User({ username, email, password, tag, profileImage });
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = createUser;