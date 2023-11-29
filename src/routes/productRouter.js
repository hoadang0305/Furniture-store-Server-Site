const router = require("express").Router();
const getAllProducts = require("../controller/productsController.js");

//---------------------------------------------
//CREATE - only for admin
const ProductInfo = require("../models/productModel.js");
router.post("/newProduct", async (req, res) => {
  try {
    const newProduce = new ProductInfo(req.body);
    const product = await newProduce.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //GET ALL PRODUCT
// router.get('/',getAllProducts);

// Get all products
router.get("/", async (req, res) => {
  try {
    // 1. Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = ProductInfo.find(JSON.parse(queryStr));

    // 2. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3. Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4. Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    console.log(page, limit, skip);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await ProductInfo.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exists");
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

//-----------------------------------------------------
module.exports = router;
