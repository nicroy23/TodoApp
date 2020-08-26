const db = require("./connection");
const Joi = require('joi');

const todos = db.get('todos');

const todoSchema = Joi.object().keys({
    todo_str: Joi.string().required(),
});

function newTodo(todo) {
    const result = todoSchema.validate(todo);

    if(result.error == null) {
        return todos.insert(todo);
    } else {
        return Promise.reject(result.error);
    }
}

function getAllTodos() {
    return todos.find();
}

module.exports = {
    newTodo,
    getAllTodos,
}