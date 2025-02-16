const CountryModel = require("../model/country.model");

exports.getCountry = async (req, res) => {
  try {
    const response = await CountryModel.getCountries();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't get country ", error });
  }
};

exports.createCountry = async (req, res) => {
  const { name, code } = req.body;
  try {
    const response = await CountryModel.createCountry(name, code);
    return res.status(201).json({ message: "Country " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't create country ", error });
  }
};

exports.deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await CountryModel.deleteCountry(id);
    return res.status(201).json({ message: "Country delete succesfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't delete country ", error });
  }
};
