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

const update = async (id, data, paths) => {
  const fetchPathsQuery = await executeQuery({
    query: getSQLQuery([1014]),
    params: [id],
  });

  if (!fetchPathsQuery?.status) throw fetchPathsQuery;
  const fetchData = fetchPathsQuery?.data[0];
  let joinPath = paths;

  if (paths && fetchPathsQuery?.data.length > 0 && fetchData.path) {
    const existingPaths = JSON.parse(fetchData.path);
    joinPath = existingPaths.concat(paths);
  }
  const fieldsToUpdate = [];
  const valuesToUpdate = [];
  if (data.name !== undefined && toNullIfEmpty(data.name) !== null) {
    fieldsToUpdate.push("name = ?");
    valuesToUpdate.push(toNullIfEmpty(data.name));
  }

  if (
    data.subcategory_id !== undefined &&
    toNullIfEmpty(data.subcategory_id) !== null
  ) {
    fieldsToUpdate.push("subcategory_id = ?");
    valuesToUpdate.push(toNullIfEmpty(data.subcategory_id));
  }
  if (
    data.subcategory_slug !== undefined &&
    toNullIfEmpty(data.subcategory_slug) !== null
  ) {
    fieldsToUpdate.push("subcategory_slug = ?");
    valuesToUpdate.push(toNullIfEmpty(data.subcategory_slug));
  }

  if (
    data.itemsubcategory_id !== undefined &&
    toNullIfEmpty(data.itemsubcategory_id) !== null
  ) {
    fieldsToUpdate.push("itemsubcategory_id = ?");
    valuesToUpdate.push(toNullIfEmpty(data.itemsubcategory_id));
  }

  if (
    data.itemsubcategory_slug !== undefined &&
    toNullIfEmpty(data.itemsubcategory_slug) !== null
  ) {
    fieldsToUpdate.push("itemsubcategory_slug = ?");
    valuesToUpdate.push(toNullIfEmpty(data.itemsubcategory_slug));
  }

  if (
    data.manufacter_id !== undefined &&
    toNullIfEmpty(data.manufacter_id) !== null
  ) {
    fieldsToUpdate.push("manufacter_id = ?");
    valuesToUpdate.push(toNullIfEmpty(data.manufacter_id));
  }

  if (data.price !== undefined && toNullIfEmpty(data.price) !== null) {
    fieldsToUpdate.push("price = ?");
    valuesToUpdate.push(toNullIfEmpty(data.price));
  }

  if (data.status !== undefined && toNullIfEmpty(data.status) !== null) {
    fieldsToUpdate.push("status = ?");
    valuesToUpdate.push(toNullIfEmpty(data.status));
  }

  if (data.instock !== undefined && toNullIfEmpty(data.instock) !== null) {
    fieldsToUpdate.push("inStock = ?");
    valuesToUpdate.push(toNullIfEmpty(data.instock));
  }

  if (data.warranty !== undefined && toNullIfEmpty(data.warranty) !== null) {
    fieldsToUpdate.push("warranty = ?");
    valuesToUpdate.push(toNullIfEmpty(data.warranty));
  }

  if (data.discount !== undefined && toNullIfEmpty(data.discount) !== null) {
    fieldsToUpdate.push("discount = ?");
    valuesToUpdate.push(toNullIfEmpty(data.discount));
  }
  if (
    data.description !== undefined &&
    toNullIfEmpty(data.description) !== null
  ) {
    fieldsToUpdate.push("description = ?");
    valuesToUpdate.push(toNullIfEmpty(data.description));
  }

  if (data.barcode !== undefined && toNullIfEmpty(data.barcode) !== null) {
    fieldsToUpdate.push("barcode = ?");
    valuesToUpdate.push(toNullIfEmpty(data.barcode));
  }

  if (data.SKU !== undefined && toNullIfEmpty(data.SKU) !== null) {
    fieldsToUpdate.push("SKU = ?");
    valuesToUpdate.push(toNullIfEmpty(data.SKU));
  }

  if (joinPath !== null) {
    fieldsToUpdate.push("path = ?");
    valuesToUpdate.push(joinPath ? JSON.stringify(joinPath) : null);
  }

  if (fieldsToUpdate.length === 0) {
    throw false;
  }

  const updateQuery = `
  UPDATE product 
  SET ${fieldsToUpdate.join(", ")}
  WHERE id = ?
`;
  valuesToUpdate.push(id);
  const result = await executeQuery({
    query: updateQuery,
    params: valuesToUpdate,
  });
  if (!result?.status) throw result;
  return result?.data;
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
  deletePhoto,
  update,
};
