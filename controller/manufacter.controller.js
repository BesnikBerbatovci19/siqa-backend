const ManufacterModel = require("../model/manufacter.model");
const { generateSlugSubCategoryByName } = require("../utils/generateSlug");

exports.getAllManufacter = async (req, res) => {
  try {
    const response = await ManufacterModel.getAllManufacter();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching manufacter", error });
  }
};

exports.getAllManufacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ManufacterModel.getAllManufacterById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching manufacter", error });
  }
};
exports.createManufacter = async (req, res) => {
  const { catId, name } = req.body;
  if (!catId || !name) {
    return res.status(400).json({ message: "Emri duhet plotsuar" });
  }

  const slug = generateSlugSubCategoryByName(name);
  try {
    const response = await ManufacterModel.createManufacter(catId, name, slug);
    return res.status(201).json({ message: "Brendi u shtua me sukses" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating manufacter", error });
  }
};

exports.deleteManufacter = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ManufacterModel.deleteManufacter(id);
    return res.status(201).json({ message: "Brendi u fshi me sukses" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting manufacter", error });
  }
};
