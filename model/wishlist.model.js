const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");

const getProductInWishList = async (biskoId) => {
  const result = await executeQuery({
    query: getSQLQuery([1027]),
    params: [biskoId],
  });
  if (!result?.status) throw result;
  return result?.data;
};

const createWishList = async (product_id, biskoId) => {
  const checkIfExist = await executeQuery({
    query: getSQLQuery([1028]),
    params: [product_id, biskoId],
  });

  if (checkIfExist?.data?.length > 0) {
    throw new Error("Product already exists in the wishlist");
  }
  const result = await executeQuery({
    query: getSQLQuery([2010]),
    params: [product_id, biskoId],
  });

  if (!result?.status) throw result;
  return result?.data;
};

const deleteFromWishlist = async (productId, biskoId) => {
  const result = await executeQuery({
    query: getSQLQuery([4010]),
    params: [productId, biskoId],
  });

  if (!result?.status) throw result;
  return result?.data;
};

module.exports = { getProductInWishList, createWishList, deleteFromWishlist };
