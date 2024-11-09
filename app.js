require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const lessonsRouter = require("./routes/lessons");

const app = express();
app.use(express.json());
app.use("/api/lessons", lessonsRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started on port ${process.env.PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});
