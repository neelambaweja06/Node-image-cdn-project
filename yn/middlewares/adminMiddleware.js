const isAdmin = (req, res, next) => {
  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only"
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

module.exports = isAdmin;