const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAllManufacter = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1011]),
  });
  if (!result?.status) throw result;
  return result.data;
};

const getAllManufacterById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1025]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

const createManufacter = async (catId, name, slug) => {
  const result = await executeQuery({
    query: getSQLQuery([2004]),
    params: [catId, name, slug],
  });
  if (!result?.status) throw result;
  return result.data;
};

const deleteManufacter = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4004]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

module.exports = {
  getAllManufacter,
  createManufacter,
  deleteManufacter,
  getAllManufacterById,
};
