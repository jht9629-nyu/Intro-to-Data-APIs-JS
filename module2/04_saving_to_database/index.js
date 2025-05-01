const express = require('express');
// const Datastore = require('nedb');
const Datastore = require('@seald-io/nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore({ filename: 'database.db' });
// const db = new Datastore({ filename: 'path/to/datafile' })
database.loadDatabase();

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data, function (err, newDoc) {
    console.log('database insert err', err);
    console.log('database insert newDoc', newDoc);
  });
  response.json(data);
});

/*

db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});


*/
