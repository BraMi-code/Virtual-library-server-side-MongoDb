const sql = require("../database.js");
const token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const md5 = require("md5")


const User = {};

User.login = (user, result) => {
   var password = md5(user.password);
   console.log("md5 pass: ", password);
   sql.query(`SELECT * FROM users WHERE username = '${user.username}' and password = '${password}'`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         //res.send('Incorrect Username and/or Password!');
         result(err, null);
         return;
      }
      if (res.length) {
         console.log("found user: ", res[0]);
         result(null, res[0]);
         return;
      }
      // not found User with the id
      result({ msg: "user not found" }, null);
   });
}

/*
// constructor
const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.token = token;
};


User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("zauzet username");
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", {  token: res.token, ...newUser });
    result(null, {  token: res.token, ...newUser });
  });
};



User.findById = (password, username, result) => {
  var password = JSON.stringify(md5(password));
  console.log(JSON.stringify(md5(password)));
  var username = JSON.stringify(username);
  console.log(JSON.stringify(username));
  if (password && username) {
    sql.query(`SELECT * FROM users WHERE password = ${password} and username = ${username}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        res.send('Incorrect Username and/or Password!');
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        res.redirect('/book')
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  }
};


User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (isbn, user, result) => {
  sql.query(
  "UPDATE users SET isbn = ?, title = ?, author = ?, publish_date = ?, publisher = ?, numOfPages = ? WHERE isbn = ?",
    [user.username, user.email, user.password, isbn],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { isbn: isbn, ...user });
      result(null, { isbn: isbn, ...user });
    }
  );
};

User.remove = (isbn, result) => {
  sql.query("DELETE FROM users WHERE isbn = ?", isbn, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with isbn: ", isbn);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
*/
module.exports = User;
