const db = require("../lib/mysql");
exports.get = async (username, password) => {
    try {
        let productDetails = await db("products").select("product_id", "title", "description", "image_url", "price");
        return productDetails;

    } catch (error) {
        reject(error);
    }
};

exports.insert = async (data) => {
    try {
        let saveProduct = await db("products").insert(data);
        return saveProduct;
    } catch (error) {
        reject(error);
    }
};

exports.update = async (data) => {
    try {
        let { product_id } = data;
        delete data.product_id;
        let updatedProductDetails = await db("products").update(data).where({ "product_id": product_id })
        return updatedProductDetails;
    } catch (error) {
        reject(error);
    }
};

exports.delete = async (data) => {
    try {
        let deletedProduct = await db("products").delete().where({ product_id: data.product_id })
        return deletedProduct;

    } catch (error) {
        reject(error);
    }
};