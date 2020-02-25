const port = process.env.PORT;
const backend = process.env.BACKEND_URL;
const apiKey = process.env.API_KEY;

const app = require("express")();
const request = require("request");

app.get("/", (req, res) => {
  if (port === "8080") {
    console.log("Port should not be 8080");
    res.status(500).send();
    return;
  }

  res.sendFile("index.html", { root: __dirname });
});

app.get("/api/film-titles", (req, res) => {
  const query = req.query.year ? `year=${req.query.year}` : "";

  const options = {
    url: `${backend}/${query}`,
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      console.log(error);
      console.log(response.statusCode);
      return res.status(500).send("Failed to handle request");
    }

    res.json(JSON.parse(body));
  });
});

app.listen(PORT);
console.log(`Service started on http://0.0.0.0:${port}`);
