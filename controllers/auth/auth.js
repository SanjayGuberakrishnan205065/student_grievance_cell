const userLoggedIn = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  userLoggedIn,
  logout,
};
