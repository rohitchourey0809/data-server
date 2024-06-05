const jsonServer = require("json-server");
const low = require("lowdb");
const Memory = require("lowdb/adapters/Memory");
const path = require("path");
require("dotenv").config();

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Use Memory adapter for in-memory database
const adapter = new Memory();
const db = low(adapter);

// Load db.json data into in-memory database
const dbFilePath = path.join(__dirname, "db.json");
const data = JSON.parse(require("fs").readFileSync(dbFilePath, "utf-8"));
db.defaults(data).write();

// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

const router = jsonServer.router(db);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

module.exports = server;
