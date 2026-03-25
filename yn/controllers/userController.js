const User = require("../models/userModel");
// ✅ GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (err) {
    console.error("GET ALL USERS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.getUserById(userId);

    // ❌ USER NOT FOUND
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // ✅ SUCCESS
    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (err) {
    console.error("GET USER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// ✅ UPDATE USER BY ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { first_name, last_name, mobile_number, role_id } = req.body;

    const result = await User.updateUser(
      userId,
      first_name,
      last_name,
      mobile_number,
      role_id
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully"
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



// const updateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const { first_name, last_name, mobile_number } = req.body;

//     await User.updateUser(userId, first_name, last_name, mobile_number);

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully"
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// };

// ✅ DELETE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.deleteUser(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};