const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const modTodo = require('./database/new-todo');

app.use(express.static("../public"));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(morgan("tiny"));

app.get('/todos', (req, res) => {
  modTodo.getAllTodos().then((todos) => {
    res.json(todos);
  });
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  modTodo
    .newTodo(req.body)
    .then(() => {
      res.json({ success: "Todo ajoute." });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: "Erreur du serveur." });
      console.log(err);
    });
});

app.delete("/delete-todo/:id", (req, res) => {
  modTodo.deleteThisTodo(req.params.id)
    .then(() => { res.json({ success: "Todo supprime." }) })
    .catch((err) => {
      res.status(500);
      res.json({ error: "Erreur du serveur." });
      console.log(err);
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});