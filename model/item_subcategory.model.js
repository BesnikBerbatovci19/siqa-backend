const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAllItemSubcategoryById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1010]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

const createItemSubCategory = async (
  subCat,
  name,
  description,
  slug,
  order
) => {
  const result = await executeQuery({
    query: getSQLQuery([2003]),
    params: [subCat, name, description, slug, order],
  });
  if (!result?.status) throw result;
  return result.data;
};

const deleteItemSubcategory = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4003]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

const getAllItemSubcategory = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1015]),
  });
  if (!result?.status) throw result;
  return result.data;
};
module.exports = {
  getAllItemSubcategoryById,
  getAllItemSubcategory,
  createItemSubCategory,
  deleteItemSubcategory,
};
