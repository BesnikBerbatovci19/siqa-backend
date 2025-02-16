const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getCities = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1020]),
  });
  if (!result?.status) throw result;
  return result.data;
};

const getCityByCountryId = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1021]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

const createCity = async (name, code, countryId) => {
  const result = await executeQuery({
    query: getSQLQuery([2008]),
    params: [name, code, countryId],
  });
  if (!result?.status) throw result;
  return result.data;
};

const deleteCity = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4008]),
    params: [id],
  });
  if (!result?.status) throw result;
  return result.data;
};

module.exports = {
  getCities,
  createCity,
  deleteCity,
  getCityByCountryId,
};
