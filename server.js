const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = 3001; //process.env.PORT ||

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
