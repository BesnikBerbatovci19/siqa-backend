function generateSlugSubCategoryByName(name) {
  return name
    .toLowerCase()
    .replace(/[\\/]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

module.exports = {
  generateSlugSubCategoryByName,
};
