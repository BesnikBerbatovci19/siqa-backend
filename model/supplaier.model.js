const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getSupplaier = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1016]),
  });

  if (!result?.status) throw result;
  return result?.data;
};

const getSupplaierById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1017]),
  });

  if (!result?.status) throw result;
  return result?.data;
};

const createSupplaier = async (name, country) => {
  const result = await executeQuery({
    query: getSQLQuery([2006]),
    params: [name, country],
  });

  if (!result?.status) throw result;
  return result?.data;
};

const updateSupplaier = async (name, country, id) => {
  const result = await executeQuery({
    query: getSQLQuery([3005]),
    params: [name, country, id],
  });

  if (!result?.status) throw result;
  return result?.data;
};

const deleteSupplaier = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4006]),
    params: [id],
  });

  if (!result?.status) throw result;
  return result?.data;
};

module.exports = {
  getSupplaier,
  createSupplaier,
  deleteSupplaier,
  updateSupplaier,
  getSupplaierById,
};
