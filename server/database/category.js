const db = require("./connection");
const Joi = require('joi');

const categories = db.get('categories');

const todoSchema = Joi.object().keys({
    cat_id: Joi.string().required(),
    color: Joi.string(),
    cat_str: Joi.string(),
});

function getAllCategories() {
    return categories.find();
}

function updateCategoryColor(id, color) {
    return categories.update(
        { cat_id: id },
        { $set: { color: color } }
    );
}

function updateCategoryTitle(id, title) {
    return categories.update(
        { cat_id: id },
        { $set: { cat_str: title } }
    );
}

module.exports = {
    updateCategoryColor,
    getAllCategories,
    updateCategoryTitle
}