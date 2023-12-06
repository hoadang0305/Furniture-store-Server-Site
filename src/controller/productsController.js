const ProductInfo = require("../models/Product");

const getAllProducts = async (req, res) => {
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
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductInfo.findById(productId);
    if (!product) {
      throw new Error("This product does not exists");
    }
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { getAllProducts, getProductById };
