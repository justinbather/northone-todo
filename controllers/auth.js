const createToken = require("../config/createToken");
const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const Login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ message: "Username or password missing" });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const auth = bcrypt.compareSync(password, user.password);

    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password" });
    } else {
      const token = createToken(user._id);
      if (process.env.NODE_ENV === 'production') {
        res.cookie("token", token, {
          httpOnly: true,
          withCredentials: true,
          domain: 'algorace-user-service-c4f17757eccb.herokuapp.com',
          sameSite: 'None',
          secure: true
        });
        return res.status(200).json({ message: "User logged in successfully" });

      } else {
        res.cookie("token", token, {
          httpOnly: true,
          withCredentials: true,
        });
        return res.status(200).json({ message: "User logged in successfully" });

      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error: err });
  }
};


const Signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({ username, password });

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      withCredentials: true,
    })
    return res.status(201).json({ message: "User created in successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error creating user", error: err });
  }

};

const Logout = async (_req, res) => {
  try {

    res.clearCookie("token")
    res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(500)
  }
}

module.exports = { Login, Signup, Logout };
