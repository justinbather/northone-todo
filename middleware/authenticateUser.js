const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "You must be logged in" });
  }

  try {
    jwt.verify(token, process.env.JWT_HASH, async (err, data) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      } else {
        //Token stores user id when created
        const user = await User.findById(data.id);

        if (user) {
          //store user into this request
          req.user = user._id;
          req.username = user.username

          //give control to next middleware
          return next();
        } else {
          return res.status(400).json({ message: "Could not verify user" });
        }
      }
    });
  } catch (err) {
    console.error("error occured verifying user", err);
    return res.status(500).json({ error: err });
  }
};

module.exports = authenticateUser;
