const User = require("../../models/auth/User");

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware provides this

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = deleteUser;
