const db = require("./connection");
const Joi = require('joi');

const todos = db.get('todos');

const todoSchema = Joi.object().keys({
    todo_str: Joi.string().required(),
    todo_client_id: Joi.string().required(),
    todo_color: Joi.string().required(),
});

function newTodo(todo) {
    const result = todoSchema.validate(todo);

    if (result.error == null) {
        return todos.insert(todo);
    } else {
        return Promise.reject(result.error);
    }
}

function getAllTodos() {
    return todos.find();
}

function deleteThisTodo(id) {
    return todos.remove({ todo_client_id: id });
}

function updateColor(id, color) {
    return todos.update(
        { todo_client_id: id },
        { $set: { todo_color: color } }
    );
}

module.exports = {
    newTodo,
    getAllTodos,
    deleteThisTodo,
    updateColor
}