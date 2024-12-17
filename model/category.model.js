const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAllCategory = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1003]),
  });

  if (!result?.status) throw result;

  return result.data;
};

const getCategoryById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1004]),
    params: [id],
  });
  if (!result?.status) throw result;

  return result.data;
};

const createCategory = async (name, description, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2001]),
    params: [name, description, order],
  });
  if (!result?.status) throw result;

  return result.data;
};

const updateCategory = async (name, description, order, id) => {
  const result = await executeQuery({
    query: getSQLQuery([3001]),
    params: [name, description, order, id],
  });

  if (!result?.status) throw result;

  return result.data;
};

const deleteCategory = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4001]),
    params: [id],
  });
  if (!result?.status) throw result;

  return result.data;
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
