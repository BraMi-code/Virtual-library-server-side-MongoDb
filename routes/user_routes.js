module.exports = app => {
  const users = require("../controllers/user_controller.js");

// login user
app.post("/user/login", users.login);

// create a new user
app.post("/user/signup", users.signup);

// forgot password
app.post("/user/forgot", users.forgot);

// confirm user's email
app.get("/user/confirm/:token", users.confirm);

// TEST: route protected with token
app.get("/test-protected", users.authenticateToken, users.testProtected);
};
/* 
//Retrieve all users
app.get("/users", users.findAll);

// Retrieve a single user with userId
// app.get("/user/:userId", users.findOne);

// Update a user with userId
app.put("/user/:userId", users.update);

// Delete a user with userId
  app.delete("/user/:userId", users.delete);

  // Create a new Customer
  app.delete("/users", users.deleteAll);
*/

