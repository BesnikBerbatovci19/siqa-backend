const SupplaierModel = require("../model/supplaier.model");

exports.getSupplaier = async (req, res) => {
  try {
    const result = await SupplaierModel.getSupplaier();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting supplaier", error });
  }
};

exports.getSignelSupplaier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SupplaierModel.getSupplaierById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting supplaier", error });
  }
};

exports.createSupplaier = async (req, res) => {
  const { name, country } = req.body;
  try {
    const result = await SupplaierModel.createSupplaier(name, country);
    return res.status(201).json({ message: "Supplaier creating succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating supplaier", error });
  }
};

exports.updateSupplaier = async (req, res) => {
  const { id } = req.params;
  const { name, country } = req.body;
  try {
    const result = await SupplaierModel.updateSupplaier(name, country, id);
    return res.status(201).json({ message: "Supplaier updating succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating supplaier", error });
  }
};

exports.deleteSupplaier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SupplaierModel.deleteSupplaier(id);
    return res.status(201).json({ message: "Supplaier deleted succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting supplaier", error });
  }
};
