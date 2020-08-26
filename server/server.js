const express = require('express');
const app = express();
const port = 3000;

app.get('/todos', (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});