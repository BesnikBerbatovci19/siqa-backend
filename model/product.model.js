const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAllProduct = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1013]),
  });
  if (!result?.status) throw result;
  return result?.data;
};

const getProductById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1014]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result?.data;
};

const createProduct = async (
  userId,
  categoryId,
  categorySlug,
  subcategoryId,
  subcategorySlug,
  itemsubcategoryId,
  itemsubcategorySlug,
  slug,
  manufacturerId,
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
  path
) => {
  const result = await executeQuery({
    query: getSQLQuery([2005]),
    params: [
      userId,
      categoryId,
      categorySlug,
      subcategoryId,
      subcategorySlug,
      itemsubcategoryId,
      itemsubcategorySlug,
      slug,
      manufacturerId,
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
      JSON.stringify(path),
    ],
  });
  if (!result?.status) throw result;
  return result?.data;
};

const deleteProduct = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4005]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result?.data;
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
};
