const toNullIfEmpty = (value) => {
  if (value === "" || value === "undefined" || value === "null") {
    return null;
  } else if (value === null || value === undefined) {
    return null;
  } else {
    return value;
  }
};

module.exports = { toNullIfEmpty };
