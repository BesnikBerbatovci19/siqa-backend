const CityModel = require("../model/city.model");

exports.getCities = async (req, res) => {
  try {
    const response = await CityModel.getCities();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't get cities", error });
  }
};

exports.getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CityModel.getCityByCountryId(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't get city", error });
  }
};
exports.createCity = async (req, res) => {
  const { name, code, countryId } = req.body;
  try {
    const response = await CityModel.createCity(name, code, countryId);
    return res.status(201).json({ message: "City created succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't create city", error });
  }
};

exports.deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CityModel.deleteCity(id);
    return res.status(201).json({ message: "City deleted succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't delete country", error });
  }
};
