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
    1002: `SELECT id, name, surname, role, phone, email, address FROM ${databaseTables.USERS} WHERE id = ?;`,
    1003: ` SELECT 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', c.id,
                    'name', c.name,
                    'description', c.description,
                    'order', c.order,
                    'subcategories', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', sc.id,
                                'category_id', sc.category_id,
                                'name', sc.name,
                                'description', sc.description,
                                'slug', sc.slug,
                                'created_at', sc.created_at,
                                'updated_at', sc.updated_at,
                                'item_subcategories', (
                                    SELECT JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            'id', isc.id,
                                            'subcategory_id', isc.subcategory_id,
                                            'name', isc.name,
                                            'description', isc.description,
                                            'slug', isc.slug,
                                            'created_at', isc.created_at,
                                            'updated_at', isc.updated_at
                                        )
                                    )
                                    FROM ${databaseTables.ITEM_SUBCATEGORY} isc
                                    WHERE isc.subcategory_id = sc.id
                                )
                            )
                        )
                        FROM ${databaseTables.SUBCATEGORY} sc
                        WHERE sc.category_id = c.id
                    )
                )
            ) AS categories
        FROM 
            ${databaseTables.CATEGORY} c;
`,
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
      m.category_id = c.id 
      ORDER BY 
      m.created_at DESC`,
    1012: `SELECT * FROM ${databaseTables.MANUFACTER} WHERE id = ?`,
    1013: `SELECT * FROM ${databaseTables.PRODUCT} LIMIT ?`,
    1014: `SELECT * FROM ${databaseTables.PRODUCT} WHERE id = ?`,
    1015: `
          SELECT ${databaseTables.ITEM_SUBCATEGORY}.*, ${databaseTables.SUBCATEGORY}.name AS subcategory_name
          FROM ${databaseTables.ITEM_SUBCATEGORY}
          JOIN ${databaseTables.SUBCATEGORY} ON ${databaseTables.ITEM_SUBCATEGORY}.subcategory_id = ${databaseTables.SUBCATEGORY}.id;  
          `,
    1016: `SELECT * FROM ${databaseTables.SUPPLAIER}`,
    1017: `SELECT * FROM ${databaseTables.SUPPLAIER} WHERE id = ?`,
    1018: `SELECT * FROM ${databaseTables.COUNTRY}`,
    1019: `SELECT * FROM ${databaseTables.COUNTRY} WHERE id = ?;`,
    1020: `SELECT * FROM ${databaseTables.CITIES}`,
    1021: `SELECT * FROM ${databaseTables.CITIES} WHERE country_id = ?`,
    1022: `SELECT id, photo_md, photo_sm, link, \`order\` FROM ${databaseTables.BANNER}`,
    1023: `SELECT COUNT(*) AS total FROM ${databaseTables.PRODUCT} WHERE category_slug = ?`,
    1024: `SELECT * FROM ${databaseTables.PRODUCT} WHERE category_slug = ? ORDER BY inStock DESC, id DESC`,
    1025: `SELECT * FROM ${databaseTables.MANUFACTER} WHERE category_id = ?`,
    1026: `
      SELECT 
          p.id AS id,
          p.name AS name,
          p.description,
          p.user_id,
          p.subcategory_id,
          p.subcategory_slug,
          p.itemsubcategory_id,
          p.itemsubcategory_slug,
          p.price,
          p.slug,
          p.SKU,
          p.barcode,
          p.status,
          p.inStock,
          p.warranty,
          p.path,
          p.discount,
          p.created_at AS product_created_at,
          p.updated_at AS product_updated_at,
          c.name AS categoryName,
          c.id AS categoryId,
          c.description AS categoryDescription,
          sb.id AS subCategoryId,
          sb.name AS subCategoryName,
          sb.description AS subCategoryDescription,
          sb.slug AS subCategorySlug,
          its.id AS itemSubCategoryId,
          its.name AS itemSubCategoryName,
          its.description AS itemSubCategoryDescription,
          its.slug AS itemSubCategorySlug
      FROM 
          ${databaseTables.PRODUCT} p
      LEFT JOIN 
          ${databaseTables.CATEGORY} c ON p.category_id = c.id
      LEFT JOIN
          ${databaseTables.SUBCATEGORY} sb ON p.subcategory_id = sb.id
      LEFT JOIN
          ${databaseTables.ITEM_SUBCATEGORY} its ON p.itemsubcategory_id = its.id
      WHERE 
          p.barcode = ?
      ORDER BY 
          p.id DESC;
    `,
    1027: `
    SELECT p.*, w.id AS wishlistId
      FROM ${databaseTables.PRODUCT} p
      JOIN ${databaseTables.WISHLIST} w ON p.id = w.product_id
      WHERE w.bisko_id = ?
      ORDER BY w.created_at DESC;
    `,
    1028: `SELECT * FROM ${databaseTables.WISHLIST} WHERE product_id = ? AND bisko_id = ?`,
    1029: `SELECT  
           name,
           barcode, 
           path, 
           slug, 
           itemsubcategory_id, 
           subcategory_id,
           itemsubcategory_slug 
           FROM ${databaseTables.PRODUCT} WHERE name LIKE ? LIMIT 10`,
    1030: `SELECT * FROM ${databaseTables.WEBSITE}`,
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
    2006: `INSERT INTO ${databaseTables.SUPPLAIER} (name, country) VALUES (?, ?)`,
    2007: `INSERT INTO ${databaseTables.COUNTRY} (name, code) VALUES (?, ?)`,
    2008: `INSERT INTO ${databaseTables.CITIES} (name, code, country_id) VALUES (?, ?, ?) `,
    2009: `INSERT INTO ${databaseTables.BANNER} (photo_md, photo_sm, link, \`order\`) VALUES (?, ?, ?, ?)`,
    2010: `INSERT INTO ${databaseTables.WISHLIST} (product_id, bisko_id) VALUES (?, ?)`,
    2011: `INSERT INTO ${databaseTables.WEBSITE} (name, logo, url) VALUES (?, ?, ?)`,
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
    3005: `UPDATE ${databaseTables.SUPPLAIER} 
              SET 
                name = COALESCE(?, name),
                country = COALESCE(?, country)
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
    4006: `DELETE FROM ${databaseTables.SUPPLAIER} WHERE id = ?`,
    4007: `DELETE FROM ${databaseTables.COUNTRY} WHERE id = ?`,
    4008: `DELETE FROM ${databaseTables.CITIES} WHERE id = ?`,
    4009: `DELETE FROM ${databaseTables.BANNER} WHERE id = ?`,
    4010: `DELETE FROM ${databaseTables.WISHLIST} WHERE product_id = ? AND bisko_id = ?`,
    4011: `DELETE FROM ${databaseTables.WEBSITE} WHERE id = ?`,
  };

  return queries[code];
};

const getAnalyticsQuery = (code, vars) => {
  const queries = {};

  return queries[code];
};

module.exports = { getSQLQuery };
