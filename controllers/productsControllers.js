const Product = require('../models/Products')

module.exports =  {
  createProduct: async(req, res) => {
    const newProduct = new Product(req.body)
    try {
      await newProduct.save()
      res.status(200).json("product created successfully")
    } catch (error) {
      res.status(500).json("failed to create the product")
    }
  },

  getAllProduct: async(req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json("failed to get the products")
    }
  },

  getProduct: async(req, res) => {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json("failed to get the product")
    }
  },

  searchProduct: async(req, res) => {
    try {
      const result = await Product.aggregate(
        [
          {
            $search: {
              index: "volkpedia",
              text: {
                query: req.params.key,
                path: {
                  wildcard: "*"
                }
              }
            }
          }
        ]
      )
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json("failed to get the products")
    }
  },

  deleteProduct: async(req, res) => {
    try {
      await Product.deleteOne({_id: req.params.id})
      res.status(200).json("successfully delete product")
    } catch (error) {
      console.log('error', error)
      res.status(500).json("failed to delete the product")
    }
  },

  updateProduct: async(req, res) => {
    try {
      await Product.updateOne({_id: req.params.id}, (req.body))
      res.status(200).json("successfully update product")
    } catch (error) {
      console.log('error', error)
      res.status(500).json("failed to update the product")
    }
  },
}