const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getCountries = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1018]),
  });
  if (!result?.status) throw result;
  return result.data;
};

const createCountry = async (name, code) => {
  const result = await executeQuery({
    query: getSQLQuery([2007]),
    params: [name, code],
  });
  if (!result?.status) throw result;
  return result.data;
};

const deleteCountry = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4007]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

module.exports = {
  getCountries,
  createCountry,
  deleteCountry,
};
