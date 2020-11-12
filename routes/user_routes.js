module.exports = app => {
  const users = require("../controllers/user_controller.js");

   app.post("/user/login", users.login);
/*
  // Create a new Customer
  app.post("/user/signup", users.create);

  // Retrieve all Customers
  app.get("/users", users.findAll);

  // Retrieve a single Customer with customerId
  // app.get("/user/:userId", users.findOne);

  app.post("/user/login", users.create);

  // Update a Customer with customerId
  app.put("/user/:userId", users.update);

  // Delete a Customer with customerId
  app.delete("/user/:userId", users.delete);

  // Create a new Customer
  app.delete("/users", users.deleteAll);
*/
};
