const SubCategoryModel = require("../model/subcategory.model");
const { generateSlugSubCategoryByName } = require("../utils/generateSlug");
exports.getSubCategory = async function (req, res) {
  try {
    const result = await SubCategoryModel.getSubCategory();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching subcategory", error });
  }
};

exports.getSubcategoryById = async function (req, res) {
  const { id } = req.params;

  try {
    const response = await SubCategoryModel.getAllSubCategory(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching subcategory", error });
  }
};

exports.createSubcategory = async function (req, res) {
  const { catId, name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Emri dhe pershkrimi duhet te plotsohen" });
  }
  const existingCategory = await SubCategoryModel.getAllSubCategory(catId);
  const existingOrders = existingCategory.map((item) => item.order);
  const nextOrder =
    existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
  const slug = generateSlugSubCategoryByName(name);
  try {
    const response = await SubCategoryModel.createSubCategory(
      catId,
      name,
      description,
      slug,
      nextOrder
    );
    return res.status(201).json({ message: "SubCategory added successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't insert subcategory", error });
  }
};

exports.updateSubcategory = async function (req, res) {};

exports.deleteSubcategory = async function (req, res) {
  const { id } = req.params;
  try {
    const response = await SubCategoryModel.deleteSubcategory(id);
    return res.status(201).json({ message: "Nenkategoria u fshi me sukses" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting subcategory", error });
  }
};
