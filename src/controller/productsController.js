const { errorResposerHandler } = require('../middleware/errorHandler');
const ProductInfo = require('../models/Product');

const getAllProducts = async (req,res, next) => {
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
        next(error);
      }
}

//------------------------------for admin---------------------------------
//add a product testing
const addProduct = async (req,res, next) => {
  try {
    const product = await ProductInfo.findOne({name: req.body.name});
    if(product){
      throw new Error("This product aready exists");
    }
    
    const newProduct = ProductInfo.create({
      name : req.body.name,
      price: (req.body.originPrice - req.body.originPrice * (req.body.discount / 100)),
      originPrice : req.body.originPrice,
      shortDesc: req.body.shortDesc,
      fullDesc: req.body.fullDesc,
      type: req.body.type,
      discount: req.body.discount  
    });
    if(!newProduct){
      throw new Error("Create failed!")
    }
    res.status(201).json(newProduct);
  } catch (error) {
    next(error)
  }
}

const updateProduct = async(req,res,next)=> {
  try {
    const productId =  req.params.id;
    const product = await ProductInfo.findById(productId);
    if(!product){
      throw new Error("This product does not exist");
    }
    
    product.name = req.body.name || product.name;
    product.price = (req.body.originPrice - req.body.originPrice * (req.body.discount / 100)) || product.price;
    product.originPrice = req.body.originPrice || product.originPrice;
    product.quantity = req.body.quantity || product.quantity;
    product.shortDesc = req.body.shortDesc || product.shortDesc;
    product.fullDesc = req.body.fullDesc || product.fullDesc;
    product.type = req.body.type || product.type;
    product.discount = req.body.discount || product.discount;

    const updatePro = await product.save(); 
    res.status(201).json(updatePro.select("-images"));
  } catch (err) {
    next(err);
  }
}
const deleteProduct = async(req,res,next)=> {
  try {
    const productId =  req.params.id;
    const product = await ProductInfo.findById(productId);
    if(!product){
      throw new Error("This product does not exists");
    }
    const deletionResult = await ProductInfo.deleteOne({ _id: productId });
    if (deletionResult.deletedCount === 1) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      throw new Error("Failed to delete product");
    }

  } catch (err) {
    next(err);
  }
}

module.exports = {getAllProducts,addProduct,updateProduct,deleteProduct};