const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = bcrypt.hashSync(user.password, 10);
};

User.login = (user, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }    
    var dbo = db.db(process.env.DB_NAME);
    var query = { email: user.email, active: 1 };

    dbo.collection(process.env.CL_USERS).find(query).toArray(function(err,res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(res);
      if (res.length) {
        if (bcrypt.compareSync(user.password, res[0].password)) {
          result(null, { email: res[0].email });
          return;
        } else {
          result({ msg: "Autenthication failed. Invalid email or password." }, null);
        }
      }
      // not found User with the id
      result({ msg: "Authentication failed. User not found." }, null);
      db.close();
    });
  });
}

User.signup = (newUser, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }    
    var dbo = db.db(process.env.DB_NAME);
    console.log(newUser);
    var query = { email: newUser.email };

    dbo.collection(process.env.CL_USERS).find(query).toArray(function(err,res) {
      if (err) {
        result(err, null);
        return;
      }
      // user with email already exists
      if (res.length) {
        result({ msg: "This email is already registered. Use FORGOT PASSWORD to reactivate your account." }, null);
        db.close();
        return;
      }
    });
       // if user with email doesn't exists insert new user
       dbo.collection(process.env.CL_USERS).insert(newUser, function(err, res) {
        if (err) throw err;
        console.log("new user inserted", res);
        result(null, { ...newUser});
        db.close();
       });
  });
}

User.forgot = (user, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var dbo = db.db(process.env.DB_NAME);
    var query = { email: user.email };
    var newValues = { $set: { password: user.password, active: 1 } };
    dbo.collection(process.env.CL_USERS).update(query, newValues, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("password changed for: ", user.email);
      result(null, { email: user.email });
      db.close();
    });
  });
}

User.confirm = (email, result) => {
 MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  var dbo = db.db(process.env.DB_NAME);
  var query = { email: email };
  var newValues = { $set: { active: 1 } };
  dbo.collection(process.env.CL_USERS).update(query, newValues, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("activated user: ", email);
    result(null, { email });
    db.close();
  });
 });
}

module.exports = User;
