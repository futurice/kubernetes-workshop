const XRay = require("aws-xray-sdk");
const http = XRay.captureHTTPs(require("http"));

// Configure XRay
XRay.config([XRay.plugins.EC2Plugin, XRay.plugins.ECSPlugin]);
XRay.middleware.enableDynamicNaming();

const port = process.env.PORT || 8080;
const service = process.env.SERVICE || "service-unknown";
const server = process.env.SERVER || "server-unknown";

// Create express app
const app = require("express")();

// Start trace on every incoming request
app.use(XRay.express.openSegment(service));

// Simple health check
app.get("/health", (_, res) => {
  res.status(200).send("OK");
});

// Root route call handling
app.get("/", (req, res) => {
  XRay.getSegment().addAnnotation("action", "handle root call");

  if (Math.random() > 0.9) {
    XRay.getSegment().addAnnotation("error", "something went wrong");
    console.log("Simulated error");
    res.status(500).send(`Error in ${service}`);
    return;
  }

  // Make call to upstream server and simply pass the result on
  http.get(server, resp => {
    let data = "";

    resp.on("data", chunk => {
      data += chunk;
    });

    resp.on("end", () => {
      if (res.statusCode === 200) {
        console.log(`Successfully fetched data from ${server}`);
        res.json(data);
      } else {
        console.log(`Failed to fetch data from ${server}`);
        res.status(500).send(`Error retrieving data from ${server}`);
      }
    });
  }).on("error", err => {
    console.log(`Request failed: ${err}`);
    res.status(500).send(`Error requesting data from ${server}`);
  });
});

// End trace on every finished request
app.use(XRay.express.closeSegment());

app.listen(port);
console.log(`Service ${service} started on http://0.0.0.0:${port}`);
