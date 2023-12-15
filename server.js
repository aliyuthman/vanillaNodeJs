const http = require("http");
const variables = require("./config/variables");

const url = require("url");

const itemJson = require("./items.json");

const port = variables.port || "3001";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, UPDATE, DELETE, OPTIONS"
  );

  console.log("req.method: = ", req.method);
  var parsed = url.parse(req.url, true);

  console.log(parsed);

  if (req.method === "GET") {
    res.setHeader("Content-type", "application/json");
    // res.write("Hello Node");
    res.write(JSON.stringify(itemJson));
    res.statusCode = 200;
    res.end();

    console.log("GET: returned: \n" + itemJson);
  }

  if (req.method === "PUT") {
    let newItemName = parsed.query.newItemName;
    let newItemPrice = parsed.query.newItemPrice;

    if (!newItemName) {
      console.log("PUT: newItemName is invalid");
      res.statusCode = 404;
      res.end();
      return;
    }

    if (!newItemPrice) {
      console.log("PUT: newItemPrice is invalid");
      res.statusCode = 404;
      res.end();
      return;
    }

    let newDate = new Date(Date.now());
    let newID = newDate.toISOString();

    itemJson.push({ id: newID, name: newItemName, price: newItemPrice });

    res.statusCode = 200;
  }

  if (req.method === "POST") {
    let itemId = parsed.query.id;

    switch (parsed.pathname) {
      
      case "/updateName":
        let newItemName = parsed.query.newItemName;

        if (!newItemName) {
          console.log("POST: newItemName is invalid");
          res.statusCode = 404;
          res.end();
          return;
        }

        var jsonIndex = itemJson.findIndex((item) => item.id === itemId);

        if (jsonIndex >= 0) {
          itemJson[jsonIndex].name = newItemName;
          res.statusCode = 200;
        } else {
          res.statusCode = 404;
        }

        res.end();

        break;

      case "/updatePrice":
        let newPrice = parsed.query.newPrice;

        if (!newPrice) {
          console.log("POST: newPrice is invalid");
          res.statusCode = 404;
          res.end();
          return;
        }


        var jsonIndex = itemJson.findIndex((item) => item.id === itemId);

        if (jsonIndex >= 0) {
          itemJson[jsonIndex].price = newPrice;
          res.statusCode = 200;
        } else {
          res.statusCode = 404;
        }

        res.end();
        break;

      default:
        res.statusCode = 404;
        res.end();
        break;
    }
  }

  if (req.method === "DELETE") {
    res.statusCode = 501;
    res.end();
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
  }
});

server.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
