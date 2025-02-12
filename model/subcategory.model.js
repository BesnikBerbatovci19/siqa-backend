const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getSubCategory = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1005]),
  });
  if (!result?.status) throw result;
  return result.data;
};
const getAllSubCategory = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1006]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

const createSubCategory = async (catId, name, description, slug, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2002]),
    params: [catId, name, description, slug, order],
  });
  if (!result?.status) throw result;
  return result.data;
};

const deleteSubcategory = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4002]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

module.exports = {
  getAllSubCategory,
  createSubCategory,
  deleteSubcategory,
  getSubCategory,
};
