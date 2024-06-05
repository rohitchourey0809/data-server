const jsonServer = require("json-server");
const low = require("lowdb");
const Memory = require("lowdb/adapters/Memory");
const fs = require("fs");
require("dotenv").config();

const server = jsonServer.create();

// Use Memory adapter for in-memory database
const adapter = new Memory();
const db = low(adapter);

// Load db.json data into in-memory database
const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
db.defaults(data).write();

const middlewares = jsonServer.defaults();

server.use(middlewares);
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
