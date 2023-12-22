import User from "../models/user.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const userData = new User({
        username: username,
        email: email,
        password: password,
      });
      await userData.save();
      res
        .status(201)
        .json({ status: "success", message: "user registered successfully"});
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({ status: "failed", message: "email already exists!" });
    } else {
      res
        .status(500)
        .json({
          status: "failed",
          message: "Unable To Register",
          error: error.message,
        });
    }
  }
};


export default {
  registerUser,
};
