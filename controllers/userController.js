import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const userNameValidation = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    if (username && email && password) {
      if (String(email).toLowerCase().match(validRegex)) {
        if (String(username).match(userNameValidation)) {
          const salt = await bcrypt.genSalt(parseInt(process.env.SALT_CONSTANT));
          const hashedPassword = await bcrypt.hash(password, salt);
          const userData = new User({
            username: username,
            email: email,
            password: hashedPassword,
          });
          await userData.save();
          res.status(201).json({
            status: "success",
            message: "user registered successfully",
          });
        } else {
          res
            .status(400)
            .json({
              status: "failed",
              message:
                "The username must include at least one uppercase letter, one special symbol, digits, and ensure a minimum length of 8 characters.",
            });
        }
      } else {
        res.json({ status: "failed", message: "Enter Valid Email" });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ status: "failed", message: "email already exists!" });
    } else {
      res.status(500).json({
        status: "failed",
        message: "Unable To Register",
        error: error.message,
      });
    }
  }
};

// user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ status: "failed", message: "Invalid credentials" });
      }else {
        if (String(email).toLowerCase().match(validRegex)) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res
              .status(401)
              .json({ status: "failed", message: "Invalid credentials" });
          }
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRES_IN,
          });
          return res.status(200).json({
            status: "success",
            message: "sign in Successful",
            data: {
              token: token,
            },
          });
        } else {
          res.json({ status: "failed", message: "Enter Valid Email" });
        }
      } 
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    return res.status(500).json({status: failed, message: "Internal server error", error: error.message });
  }
};

// Update User
const updateUsername = async (req, res) => {
  try {
    const { username }  = req.body;
    const userId  = req.params.userId;
    const userNameValidation = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    if (String(username).match(userNameValidation)) {
      const updateUser = await User.findByIdAndUpdate(userId, { username }, { new: true });
      console.log(updateUser);
      if (updateUser) {
        res
        .status(200)
        .json({ status: "success", message: "user updated successfully" });
      } else {
        res
        .status(404)
        .json({ status: "failed", message: "User Does Not Exist"})
      }
    } else {
      res
        .status(400)
        .json({
          status: "failed",
          message: "The username must include at least one uppercase letter, one special symbol, digits, and ensure a minimum length of 8 characters.",
        });
    }
  } catch (error) {
    res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error", error: error.message})
  }
};

export default {
  registerUser,
  userLogin,
  updateUsername,
};
