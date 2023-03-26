require('dotenv').config()
const express = require('express')
const app = express()
const config = require('config');
const mongoose = require('mongoose');

const setMiddlewares = require('./middleware/middleware');
const setRoutes = require('./routes/routes');

setMiddlewares(app);
setRoutes(app)

const PORT = process.env.PORT || 9090
const DB_URI = `mongodb+srv://${config.get("db-admin")}:${config.get("db-password")}@money-management.y8aumss.mongodb.net/money-management-app`

mongoose.set("strictQuery", false);
mongoose.connect(DB_URI, {
  useNewUrlParser: true
}).then(() => {
  console.log("Database connected.....");
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  })
}).catch((err) => {
  console.log(err);
})