const { executeQuery } = require("../config/database");
const { getSQLQuery } = require("../lib/getSQLQuery");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const result = await executeQuery({
    query: getSQLQuery([1000]),
  });
  if (!result?.status) throw result;

  return result.data;
};

const getUserByEmail = async ({ email }) => {
  const result = await executeQuery({
    query: getSQLQuery([1001]),
    params: [email],
  });

  if (!result?.status) throw result;
  return result?.data;
};
const getUserById = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([1002]),
    params: [id],
  });

  if (!result?.status) throw result;
  return result?.data[0];
};

const createUser = async ({ name, surname, email, phone, password, role }) => {
  const result = await executeQuery({
    query: getSQLQuery([2000]),
    params: [name, surname, email, phone, bcrypt.hashSync(password, 10), role],
  });
  if (!result?.data) throw result;
  return result;
};

const updateUser = async (id, userData) => {
  let query = `
    UPDATE users
    SET 
      name = COALESCE(?, name),
      surname = COALESCE(?, surname),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      role = COALESCE(?, role)
  `;

  let params = [
    userData?.name,
    userData?.surname,
    userData?.email,
    userData?.phone,
    userData?.role,
  ];

  if (userData?.password) {
    const hashPassword = bcrypt.hashSync(userData?.password, 10);
    query += ", password = ?";
    params.push(hashPassword);
  }

  query += ` WHERE id = ?`;
  params.push(id);

  // Execute the query
  const result = await executeQuery({
    query: query,
    params: params,
  });

  if (!result?.status) throw result;
  return result.data;
};

const updateGuestUser = async (id, userData) => {
  let query = `
    UPDATE users
    SET 
      name = ?,
      surname = ?,
      email = ?,
      phone = ?,
      address = ?
  `;
  const params = [
    userData?.name ?? null,
    userData?.surname ?? null,
    userData?.email ?? null,
    userData?.phone ?? null,
    userData?.address ?? null,
  ];

  if (userData?.password) {
    const hashPassword = bcrypt.hashSync(userData?.password, 10);
    query += ", password = ?";
    params.push(hashPassword);
  }

  query += " WHERE id = ?";
  params.push(id);

  const result = await executeQuery({
    query,
    params,
  });

  if (!result?.status) throw result;
  return result.data;
};

const deleteUser = async (id) => {
  const result = await executeQuery({
    query: getSQLQuery([4000]),
    params: [id],
  });
  if (!result?.data) throw result;
  return result;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateGuestUser,
};
