const Product = require('../models/product');
const formidable = require('formidable')
const _ = require('lodash');
const {errorHandler} = require('../helpers/dbErrorHandler')
const fs = require('fs')

exports.productById = (req,res,next) => {
  Product.findById(id).exec((err, product) => {
    if(err || !product){
      return res.status(400).json({
        error: "product could not be found"
      });
    }
    req.product = product
    next();
  });
}

exports.read = (req,res) => {
  req.product.photo = undefined
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtentions = true
  form.parse(req, (err,fields,files) => {
    if(err){
      return res.status(400).json({
        error: 'image could not be uploaded'
      });
    }
//check
const {name, description, price, category, quantity, shipping} = fields
if(!name || !description || !price ||!category || !quantity || !shipping){
  return res.status(400).json({
    error: "all fields are required"
  });
}

    let product = new Product(fields)

    if(files.photo){
      if(files.photo.size > 1000000){
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        })
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }
    product.save((err,result) => {
      if(err){
        console.log(err);
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });

};
