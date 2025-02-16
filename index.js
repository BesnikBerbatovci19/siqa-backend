const express = require("express");
const app = express();
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const { getDbConnection } = require("./config/database");

// Load Routes
const userRoute = require("./route/user");
const categoryRoute = require("./route/categoryRoute");
const subCategoryRoute = require("./route/subCategoryRoute");
const itemsubcategoryRoute = require("./route/itemSubcategory");
const authRoute = require("./route/auth");
const manufacterRoute = require("./route/manufacter");
const productRoute = require("./route/product");
const supplaierRoute = require("./route/supplaierRoute");
const countryRoute = require("./route/countryRoute");
const cityRoute = require("./route/cityRoute");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Enable CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Initialize Passport
require("./config/passport");
app.use(passport.initialize());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Serve Static Files (e.g., Public Assets)
app.use(express.static(path.join(__dirname)));

// Routes
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subCategoryRoute);
app.use("/api/itemsubcategory", itemsubcategoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/manufacter", manufacterRoute);
app.use("/api/product", productRoute);
app.use("/api/supplaier", supplaierRoute);
app.use("/api/country", countryRoute);
app.use("/api/city", cityRoute);

// Port Configuration
const PORT = 5000;

// Database Connection
const checkDatabaseConnection = async () => {
  try {
    await getDbConnection();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
checkDatabaseConnection();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
