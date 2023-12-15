const http = require("http");
const variables = require("./config/variables");

const itemJson = require("./items.json");

const port = variables.port || "3001";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, UPDATE, OPTIONS"
  );
  if (req.method === "GET") {
    console.log("HTTP METHOD: ", req.method);
    res.setHeader("Content-type", "application/json");
    // res.write("Hello Node");
    res.write(JSON.stringify(itemJson));
    res.statusCode = 200;
    res.end();

    console.log("GET: returned: \n" + itemJson);
  }
});

server.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
