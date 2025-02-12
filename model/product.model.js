const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");
const { toNullIfEmpty } = require("../utils/convertTypeData");

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
  return result?.data[0];
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
  SKU,
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
      toNullIfEmpty(price),
      purchasePrice,
      SKU,
      barcode,
      status,
      toNullIfEmpty(instock),
      toNullIfEmpty(warranty),
      toNullIfEmpty(discount),
      path,
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

const deletePhoto = async (id, idPhoto) => {
  const result = await executeQuery({
    query: getSQLQuery([1014]),
    params: [id],
  });
  let photo = JSON.parse(result.data[0].path || []).filter(
    (item) => item.id != idPhoto
  );
  const resultUpdate = await executeQuery({
    query: getSQLQuery([3004]),
    params: [JSON.stringify(photo), id],
  });
  if (!resultUpdate?.status) throw result;
  return resultUpdate?.data;
};
module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
  deletePhoto,
};
