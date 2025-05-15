const CategoryModel = require("../model/category.model");

exports.getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.getAllCategory();
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching category", error });
  }
};
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.getCategoryById(id);
    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching category", error });
  }
};
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Emri dhe pershkrimi duhet te plotsohen" });
  }
  const existingCategory = await CategoryModel.getAllCategory();

  const existingOrders = existingCategory[0]?.categories.map(
    (item) => item.order
  );

  const nextOrder =
    existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;

  try {
    const category = await CategoryModel.createCategory(
      name,
      description,
      nextOrder
    );
    return res.status(201).json({ message: "Category added successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't insert category", error });
  }
};
exports.updateCategory = async (req, res) => {};
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CategoryModel.deleteCategory(id);
    return res.status(201).json({ message: "Kategoria u fshi me sukses" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting category", error });
  }
};
