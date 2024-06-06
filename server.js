import jsonServer from "json-server";
import fs from "fs";

// Ensure db.json exists
if (!fs.existsSync("db.json")) {
  console.error("Error: db.json file not found");
  process.exit(1);
}

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`JSON Server is running on port ${port}`);
});
