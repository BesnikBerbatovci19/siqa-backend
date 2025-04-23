const BannerModel = require("../model/banner.model");
exports.getAllBanner = async function (req, res) {
  try {
    const response = await BannerModel.getAllBanner();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Interna Server Error" });
  }
};

exports.createBanner = async function (req, res) {
  const { link } = req.body;
  const files = req.files;

  if (!files || !files.photo_md || !files.photo_sm) {
    return res.status(400).json({ message: "Please upload both banners" });
  }
  const photo_md = files.photo_md[0].path;
  const photo_sm = files.photo_sm[0].path;

  const existingBanners = await BannerModel.getAllBanner();
  const existingOrders = existingBanners.map((item) => item.order);
  const nextOrder =
    existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;

  try {
    const createBanner = await BannerModel.createBanner(
      photo_md,
      photo_sm,
      link,
      nextOrder
    );
    return res.status(201).json({ message: "Baneri u shtua me sukses" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating banner", error });
  }
};
exports.deleteBanner = async function (req, res) {
  const { id } = req.params;
  try {
    const deleteResponse = await BannerModel.deleteBanner(id);
    res.json(deleteResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleteing banner", error });
  }
};
