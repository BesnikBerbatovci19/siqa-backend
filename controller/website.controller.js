const WebsiteModel = require("../model/website.model");

exports.getAllWebsite = async (req, res) => {
  try {
    const result = await WebsiteModel.getAllWebsite();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.createWebsite = async (req, res) => {
  try {
    const { name, url } = req.body;
    const logo = req.file.key;
    const result = await WebsiteModel.createWebsite(name, logo, url);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WebsiteModel.deleteWebsite(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
