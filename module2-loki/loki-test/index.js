//

// https://github.com/techfort/LokiJS
// https://techfort.github.io/LokiJS/Loki.html

const loki = require('lokijs');
const db = new loki('example.db');

db.loadDatabase({}, function (err) {
  if (err) {
    console.log('error : ' + err);
  } else {
    console.log('database loaded.');
    doStuff();
  }
});

function doStuff() {
  // Find collection
  let users = db.getCollection('users');
  if (!users) {
    // Create a collection
    console.log('addCollection');
    users = db.addCollection('users');

    // Insert documents
    users.insert({ name: 'John', age: 30, city: 'New York' });
    users.insert({ name: 'Alice', age: 25, city: 'Boston' });
    users.insert({ name: 'Bob', age: 35, city: 'Chicago' });
  }

  // Find all users
  let allUsers = users.find();
  console.log('All users:', allUsers);

  // Find users with query
  const youngUsers = users.find({ age: { $lt: 30 } });
  console.log('Young users:', youngUsers);

  // Update a user
  const john = users.findOne({ name: 'John' });
  john.age += 1;
  users.update(john);

  // Remove a user
  const bob = users.findOne({ name: 'Bob' });
  console.log('bob', bob);
  if (bob) {
    users.remove(bob);
  }

  // Current users
  allUsers = users.find();
  console.log('allUsers:', allUsers);

  db.saveDatabase(function (err) {
    if (err) {
      console.log('error : ' + err);
    } else {
      console.log('database saved.');
    }
  });
}
