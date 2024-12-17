const ProdctModel = require("../model/product.model");
const { v4: uuidv4 } = require("uuid");
const { generateSlugSubCategoryByName } = require("../utils/generateSlug");
exports.getProduct = async function (req, res) {
  try {
    const result = await ProdctModel.getAllProduct();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting product", error });
  }
};

exports.getProductById = async function (req, res) {
  const { id } = req.params;
  try {
    const result = await ProdctModel.getProductById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting product", error });
  }
};

exports.createProduct = async function (req, res) {
  const {
    categoryId,
    categorySlug,
    subcategoryId,
    subcategorySlug,
    itemsubcategoryId,
    itemsubcategorySlug,
    manufacterId,
    name,
    description,
    price,
    purchasePrice,
    sku,
    barcode,
    status,
    instock,
    warranty,
    discount,
  } = req.body;
  const path = req.files.map((file) => ({ id: uuidv4(), path: file.path }));
  const slug = generateSlugSubCategoryByName(name);
  try {
    const result = await ProdctModel.createProduct(
      null,
      categoryId,
      categorySlug,
      subcategoryId,
      subcategorySlug,
      itemsubcategoryId,
      itemsubcategorySlug,
      slug,
      manufacterId,
      name,
      description,
      price,
      purchasePrice,
      sku,
      barcode,
      status,
      instock,
      warranty,
      discount,
      JSON.stringify(path)
    );
    return res.status(201).json({ message: "Produkti u shtua me sukses" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating product", error });
  }
};

exports.updateProduct = async function (req, res) {};

exports.deleteProduct = async function (req, res) {
  const { id } = req.params;

  try {
    const result = await ProdctModel.deleteProduct(id);
    return res.json({ message: "Produkti u fshi me sukses" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting product", error });
  }
};
