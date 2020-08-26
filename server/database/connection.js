const monk = require('monk')

const url = 'mongodb://localhost:27017/todoapp';

const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
});

module.exports = db;