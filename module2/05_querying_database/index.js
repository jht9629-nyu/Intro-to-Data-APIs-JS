const express = require('express');
// const Datastore = require('nedb');
const Datastore = require('@seald-io/nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    console.log('database.find data', data);
    if (err) {
      console.log('database.find err', err);
      console.log('database.find data', data);
      response.end();
      return;
    }
    response.send(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;

  // Insert the data into the database and check for errors
  console.log('database.insert data', data);
  database.insert(data, (err, newDoc) => {
    console.log('database.insert  err', err);
    console.log('database.insert  newDoc', newDoc);
  });

  response.json(data);
});
