const express = require("express");
const doctorRoutes = require("./routes/doctor-routes");
const userRoutes = require("./routes/user-routes");
const ambulanceRoutes = require("./routes/ambulance-routes");
const reqRoutes = require("./routes/request-routes");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const appointmentRoutes = require("./routes/appointment-routes");
const userTypeRoutes = require("./routes/usertype-routes");
const scrapeRoutes=require("./routes/scrape-routes")

// CORS error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(bodyParser.json());
app.use("/api/doctors", doctorRoutes);
app.use("/api/patient", userRoutes);
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/request", reqRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/user-type", userTypeRoutes);
app.use("/api/scrape",scrapeRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Invalid request" });
});
mongoose
  .connect(
    "mongodb+srv://parasMehta:para2222@cluster0.aaspp2v.mongodb.net/hospital?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT||5000);
  })
  .catch((error) => {
    console.log(error);
  });
