const sql = require("./database.js"),
      bcrypt = require('bcrypt');

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = bcrypt.hashSync(user.password, 10);
};

User.login = (user, result) => {
  sql.query(`SELECT * FROM users_vl WHERE active = 1 and email = '${user.email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
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
  });
}

User.signup = (newUser, result) => {
  sql.query("INSERT INTO users_vl SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
        // if sql return ER_DUP_ENTRY we consider this duplicate email entry
      // since email field is PRIMARY KEY so we return message
      if (err.code == 'ER_DUP_ENTRY') {
        result({ msg: "This email is already registered. Use FORGOT PASSWORD to reactivate your account." }, null);
        return;
      }
      result(err, null);
      return;
    }
    console.log("created user: ", { ...newUser});
    result(null, { ...newUser});
  });
}

User.forgot = (user, result) => {
  sql.query("UPDATE users_vl SET password = ? WHERE email = ?", [user.password, user.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("password changed for: ", user.email);
    result(null, { email: user.email });
  });
}

User.confirm = (email, result) => {
  sql.query("UPDATE users_vl SET active = 1 WHERE email = ?", [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("activated user: ", email);
    result(null, { email });
  });
}

/*
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
