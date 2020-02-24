const XRay = require("aws-xray-sdk");

// Configure XRay
XRay.config([XRay.plugins.EC2Plugin, XRay.plugins.ECSPlugin]);
XRay.middleware.enableDynamicNaming();

const port = process.env.PORT || 8080;
const service = process.env.SERVICE || "service-unknown";

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

  // Generate some random variables to simulate real behavior
  const timeout = Math.random() * 5000;
  const success = Math.random();

  setTimeout(() => {
    if (success > 0.8) {
      console.log("GET / Successful");
      res.json({ success, timeout });
    } else {
      console.log("GET / Failed");
      res.status(500).send(`Failure in ${service}`);
    }
  }, timeout);
});

// End trace on every finished request
app.use(XRay.express.closeSegment());

app.listen(port);
console.log(`Service ${service} started on http://0.0.0.0:${port}`);
