const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getAllBanner = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1022]),
  });

  if (!result?.status) throw result;

  return result.data;
};

const createBanner = async (photo_md, photo_sm, link, order) => {
  const result = await executeQuery({
    query: getSQLQuery([2009]),
    params: [photo_md, photo_sm, link, order],
  });
  if (!result?.status) throw result;

  return result.data;
};

const deleteBanner = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4009]),
    params: [id],
  });
  if (!result?.status) throw result;

  return result.data;
};

module.exports = { getAllBanner, createBanner, deleteBanner };
