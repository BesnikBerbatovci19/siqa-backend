const { databaseTables } = require("./databaseHelper/tables");

const getSQLQuery = (queryCode, vars = "") => {
  var query = "";

  for (var i = 0; i < queryCode.length; i++) {
    var code = queryCode[i] + "";
    var code_type = code.substring(0, 1);

    switch (code_type) {
      case "1":
        // SELECT
        query += getSelectQuery(code, vars);
        break;
      case "2":
        // INSERT
        query += getInsertQuery(code, vars);
        break;
      case "3":
        // UPDATE
        query += getUpdateQuery(code, vars);
        break;
      case "4":
        // DELETE
        query += getDeleteQuery(code, vars);
        break;
      case "9":
        query += getAnalyticsQuery(code, vars);
        break;
      default:
        return false;
    }
  }
  return query;
};

const getSelectQuery = (code, vars = "") => {
  const queries = {
    1000: `SELECT * FROM ${databaseTables.USERS};`,
    1001: `SELECT * FROM ${databaseTables.USERS} WHERE email = ?;`,
    1002: `SELECT name, surname, role, phone, email FROM ${databaseTables.USERS} WHERE id = ?;`,
    1003: `SELECT * FROM ${databaseTables.CATEGORY}`,
    1004: `SELECT * FROM ${databaseTables.CATEGORY} WHERE id = ?;`,
    1005: `SELECT ${databaseTables.SUBCATEGORY}.*, ${databaseTables.CATEGORY}.name as category_name
          FROM ${databaseTables.SUBCATEGORY}
          JOIN ${databaseTables.CATEGORY} on ${databaseTables.SUBCATEGORY}.category_id  = ${databaseTables.CATEGORY}.id    
    `,
    1006: `SELECT * FROM ${databaseTables.SUBCATEGORY} WHERE category_id = ?`,
    1007: `SELECT * FROM ${databaseTables.SUBCATEGORY} WHERE id = ?`,
    1008: `SELECT * FROM ${databaseTables.ITEM_SUBCATEGORY};`,
    1009: `SELECT * FROM ${databaseTables.ITEM_SUBCATEGORY} WHERE id = ?`,
    1010: `SELECT * FROM ${databaseTables.ITEM_SUBCATEGORY} WHERE subcategory_id = ?`,
    1011: `SELECT 
      m.id AS id,
      m.name AS name,
      m.slug AS slug,
      c.name AS catName
     FROM 
      ${databaseTables.MANUFACTER} m
     JOIN 
      ${databaseTables.CATEGORY} c
     ON 
      m.category_id = c.id `,
    1012: `SELECT * FROM ${databaseTables.MANUFACTER} WHERE id = ?`,
    1013: `SELECT * FROM ${databaseTables.PRODUCT}`,
    1014: `SELECT * FROM ${databaseTables.PRODUCT} WHERE id = ?`,
    1015: `
          SELECT ${databaseTables.ITEM_SUBCATEGORY}.*, ${databaseTables.SUBCATEGORY}.name AS subcategory_name
          FROM ${databaseTables.ITEM_SUBCATEGORY}
          JOIN ${databaseTables.SUBCATEGORY} ON ${databaseTables.ITEM_SUBCATEGORY}.subcategory_id = ${databaseTables.SUBCATEGORY}.id;

    `,
  };

  return queries[code];
};

const getInsertQuery = (code, vars) => {
  const queries = {
    2000: `INSERT INTO ${databaseTables.USERS} (name, surname, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?);`,
    2001: `INSERT INTO ${databaseTables.CATEGORY} (name, description, \`order\`) VALUES (?, ?, ?);`,
    2002: `INSERT INTO ${databaseTables.SUBCATEGORY} (category_id, name, description, slug, \`order\`) VALUES (?, ?, ?, ?, ?)`,
    2003: `INSERT INTO ${databaseTables.ITEM_SUBCATEGORY} (subcategory_id, name, description, slug, \`order\`) VALUES (?, ?, ?, ?, ?)`,
    2004: `INSERT INTO ${databaseTables.MANUFACTER} (category_id, name, slug) VALUES (?, ?, ?)`,
    2005: `INSERT INTO ${databaseTables.PRODUCT} 
              (
                user_id,
                category_id, 
                category_slug, 
                subcategory_id, 
                subcategory_slug, 
                itemsubcategory_id, 
                itemsubcategory_slug, 
                slug, 
                manufacter_id, 
                name, 
                description, 
                price, 
                purchase_price, 
                SKU, 
                barcode, 
                status, 
                inStock, 
                warranty, 
                discount, 
                path
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
  };

  return queries[code];
};

const getUpdateQuery = (code, vars) => {
  const queries = {
    3000: `UPDATE ${databaseTables.USERS} SET 
      name = COALESCE(?, name),
      surname = COALESCE(?, surname),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      role = COALESCE(?, role)
    WHERE id = ? 
    `,
    3001: `UPDATE ${databaseTables.CATEGORY} SET 
    name = COALESCE(?, name),
    description = COALESCE(?, description),
    order = COALESCE(?, order) WHERE id = ?;
    `,
    3002: `UPDATE ${databaseTables.SUBCATEGORY} SET 
      category_id = COALESCE(?, category_id),
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      slug = COALESCE(?, slug),
      WHERE id = ?
    `,
    3003: `UPDATE ${databaseTables.ITEM_SUBCATEGORY} SET
        subcategory_id = COALESCE(?, subcategory_id),  
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        slug = COALESCE(?, slug),
        order = COALESCE(?, order) WHERE id = ?
    `,
    3004: `UPDATE ${databaseTables.PRODUCT} SET
           path = COALESCE(?, path)
           WHERE id = ?
    `,
  };

  return queries[code];
};

const getDeleteQuery = (code, vars) => {
  const queries = {
    4000: `DELETE FROM ${databaseTables.USERS} WHERE id = ?;`,
    4001: `DELETE FROM ${databaseTables.CATEGORY} WHERE id = ?;`,
    4002: `DELETE FROM ${databaseTables.SUBCATEGORY} WHERE id = ?;`,
    4003: `DELETE FROM ${databaseTables.ITEM_SUBCATEGORY} WHERE id = ?;`,
    4004: `DELETE FROM ${databaseTables.MANUFACTER} WHERE id = ?;`,
    4005: `DELETE FROM ${databaseTables.PRODUCT} WHERE id = ?;`,
  };

  return queries[code];
};

const getAnalyticsQuery = (code, vars) => {
  const queries = {};

  return queries[code];
};

module.exports = { getSQLQuery };
