const {
  validationRegisterInput,
  validtionUpdateInput,
} = require("../validation/auth/auth");

require("dotenv").config();

const UserModel = require("../model/user.model");

exports.getUser = async function (req, res) {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
};
exports.getUserById = async function (req, res) {
  const { id } = req.params;

  try {
    const user = await UserModel.getUserById(id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "Perdoruesi nuk egziston" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetchin user", error });
  }
};
exports.createUser = async function (req, res) {
  const { name, surname, email, phone, password, role } = req.body;

  const { errors, isValid } = validationRegisterInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  try {
    const checkIfUserExist = await UserModel.getUserByEmail({ email });
    if (checkIfUserExist.length > 0) {
      return res.status(400).json({ message: "Perdoruesi egziston" });
    }
    // Create user
    await UserModel.createUser({
      name,
      surname,
      email,
      phone,
      password,
      role,
    });
    return res.status(201).json({ message: "Perdoruesi u shtua me sukses" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user", error });
  }
};
exports.updateUser = async function (req, res) {
  const { id } = req.params;

  const { errors, isValid } = validtionUpdateInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  try {
    const updatedUser = await UserModel.updateUser(id, req.body);
    if (updatedUser.length > 0) {
      return res.status(200).json(updatedUser[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating user", error });
  }
};
exports.deleteUser = async function (req, res) {
  const { id } = req.params;
  try {
    const deleted = await UserModel.deleteUser(id);
    if (deleted) {
      return res.status(200).json({ message: "User deleted successfull" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
};
