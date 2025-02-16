const ProdctModel = require("../model/product.model");
const { v4: uuidv4 } = require("uuid");
const { generateSlugSubCategoryByName } = require("../utils/generateSlug");
const { validationAddProductInput } = require("../validation/product/product");
const path = require("path");
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
  const paths = req.files.map((file) => ({ id: uuidv4(), path: file.path }));

  const { errors, isValid } = validationAddProductInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {
    category_id,
    category_slug,
    subcategory_id,
    subcategory_slug,
    itemsubcategory_id,
    itemsubcategory_slug,
    manufacter_id,
    name,
    description,
    price,
    purchasePrice,
    SKU,
    barcode,
    status,
    instock,
    warranty,
    discount,
  } = req.body;

  const slug = generateSlugSubCategoryByName(name);
  try {
    const result = await ProdctModel.createProduct(
      null,
      category_id,
      category_slug,
      subcategory_id,
      subcategory_slug,
      itemsubcategory_id,
      itemsubcategory_slug,
      slug,
      manufacter_id,
      name,
      description,
      price,
      purchasePrice,
      SKU,
      barcode,
      status,
      instock,
      warranty,
      discount,
      JSON.stringify(paths)
    );
    return res.status(201).json({ message: "Produkti u shtua me sukses" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating product", error });
  }
};

exports.updateProduct = async function (req, res) {
  const { id } = req.params;
  const paths =
    req.files != undefined
      ? req.files.length > 0
        ? req.files.map((file) => ({
            id: uuidv4(),
            path: `uploads\\product\\${path.basename(file.path)}`,
          }))
        : null
      : null;
  try {
    ProdctModel.update(id, req.body, paths)
      .then(() => {
        res.json({
          success: true,
          message: "Product updated successfull",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error updated product" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Interna Server Error" });
  }
};

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

exports.deletePhoto = async function (req, res) {
  try {
    const { id, idPhoto } = req.params;
    ProdctModel.deletePhoto(id, idPhoto)
      .then(() => {
        res.json({
          success: true,
          message: "Photo deleted successfull",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error deleting photo" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Interna Server Error" });
  }
};
