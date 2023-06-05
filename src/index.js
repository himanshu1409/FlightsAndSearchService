const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const CityRepository = require("./repository/city-repository");
const ApiRoutes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = () => {
  // create the express server
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
    const repo = new CityRepository();
    // repo.createCity({ name: "Vadodara" });
    // repo.deleteCity(9);
    // repo.updateCity(11, { name: "Mumbai" });
    if (process.env.SYNC_DB) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
