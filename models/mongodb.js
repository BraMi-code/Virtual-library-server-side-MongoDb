var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, db) {
  console.log("err: " + err);
  console.log("db: " + db);
  if (err) {
      console.log("Unable to connect MongoDb");
      throw err;
  } else {
     console.log("Connected to mongoDb");
     db.close();
  }
});