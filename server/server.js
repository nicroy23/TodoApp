const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const modTodo = require('./database/new-todo');
const categories = require('./database/category');

//app.use(express.static("../public"));

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

app.post("/update-color/:id", (req, res) => {
  modTodo.updateColor(req.body.todo_client_id, req.body.todo_color)
    .then(() => {
      res.json({ success: "Couleur modifiee." });
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

app.get("/categories", (req, res) => {
  categories.getAllCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: "Erreur du serveur." });
      console.log(err);
    });
});

app.post("/update-category-color/:id", (req, res) => {
  categories.updateCategoryColor(req.params.id, req.body.color, req.body.title)
    .then(() => {
      res.json({ success: "Category updated." });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: "Erreur du serveur." });
      console.log(err);
    });
});

app.post("/update-category-title/:id", (req, res) => {
  categories.updateCategoryTitle(req.params.id, req.body.title)
  .then(() => {
    res.json({ success: "Category updated." });
  })
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