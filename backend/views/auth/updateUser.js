const User = require("../../models/auth/User");

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware provides this
    const { firstName, lastName, username, email, profileImage, tag } = req.body;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, username, email, profileImage, tag },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = updateUser;
