const ItemSubCategoryModel = require("../model/item_subcategory.model");
const { generateSlugSubCategoryByName } = require("../utils/generateSlug");
exports.getItemSubcategory = async function (req, res) {
  try {
    const result = await ItemSubCategoryModel.getAllItemSubcategory();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching item subcatgory", error });
  }
};

exports.getItemSubcategoryById = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await ItemSubCategoryModel.getAllItemSubcategoryById(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching item subcategory", error });
  }
};

exports.createItemSubcategory = async function (req, res) {
  const { subCatId, name, description } = req.body;
  if (!name || !description || !subCatId) {
    return res
      .status(400)
      .json({ message: "Emri dhe pershkrimi duhet te plotsohen" });
  }
  const existingCategory = await ItemSubCategoryModel.getAllItemSubcategory(
    subCatId
  );
  const existingOrders = existingCategory.map((item) => item.order);
  const nextOrder =
    existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
  const slug = generateSlugSubCategoryByName(name);
  try {
    const response = await ItemSubCategoryModel.createItemSubCategory(
      subCatId,
      name,
      description,
      slug,
      nextOrder
    );
    return res
      .status(201)
      .json({ message: "ItemSubCategory added successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't insert subcategory", error });
  }
};

exports.updateItemSubcategory = async function (req, res) {};

exports.deleteItemSubcategory = async function (req, res) {
  const { id } = req.params;
  try {
    const response = await ItemSubCategoryModel.deleteItemSubcategory(id);
    return res.status(201).json({ message: "Nenkategoria u fshi me sukses" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting itemsubcategory", error });
  }
};
