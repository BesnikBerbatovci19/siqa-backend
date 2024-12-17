const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    UserModel.getUserByEmail({ email }).then((result) => {
      const user = result[0];
      if (!user) {
        return res.status(404).json({
          message: "Email-i ose fjalkalimi janë gabimë!",
        });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(404).json({
          message: "Email-i ose fjalkalimi janë gabimë!",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        process.env.SECRETORKEY
      );

      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Interna Server Error" });
  }
};
