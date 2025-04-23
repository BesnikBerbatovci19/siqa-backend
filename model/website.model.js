const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAllWebsite = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1030]),
  });

  if (!result?.status) throw result;

  return result.data;
};

const createWebsite = async (name, logo, url) => {
  const result = await executeQuery({
    query: getSQLQuery([2011]),
    params: [name, logo, url],
  });
  if (!result?.status) throw result;

  return result.data;
};

const deleteWebsite = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4011]),
    params: [id],
  });
  if (!result?.status) throw result;

  return result.data;
};

module.exports = { getAllWebsite, createWebsite, deleteWebsite };
