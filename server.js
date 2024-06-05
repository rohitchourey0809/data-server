const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
require("dotenv").config();

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  // Add custom route here if needed
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
// Listen to port
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running ${port}`);
});

// Export the Server API
module.exports = server;
