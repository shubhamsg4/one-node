const productService = require('../services/product-services');
const ResHelper = require('../helpers/response');

exports.getProduct = async function (req, res) {
    try {
        let { username, password } = req.body
        let productDetails = await productService.get(username, password);
        if (productDetails.length) {
            ResHelper.apiResponse(res, "Products sent successfully", 200, productDetails);
        }
        else {
            ResHelper.apiResponse(res, "No record founds", 204, {});
        }

    } catch (err) {
        ResHelper.apiResponse(res, "Error occured during excution", 500, {});
    }
};

exports.saveProduct = async function (req, res) {
    try {
        let savedProduct = await productService.insert(req.body);
        ResHelper.apiResponse(res, "Product added successfully", 201, {});
    } catch (err) {
        ResHelper.apiResponse(res, "Error occured during excution", 500, {});
    }
};

exports.deleteProduct = async function (req, res) {
    try {
        let deletedProduct = await productService.delete(req.body);
        ResHelper.apiResponse(res, "Product deleted successfully", 200, {});
    } catch (err) {
        ResHelper.apiResponse(res, "Error occured during excution", 500, {});
    }
};

exports.updateProduct = async function (req, res) {
    try {
        let updatedProduct = await productService.update(req.body);
        ResHelper.apiResponse(res, "Product updated successfully", 200, {});


    } catch (err) {
        ResHelper.apiResponse(res, "Error occured during excution", 500, {});
    }
};