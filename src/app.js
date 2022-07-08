import express, { json } from "express";
import { Sequelize, DataTypes } from "sequelize";
import bodyParser from "body-parser";
import cors from "cors";
import items from "./items";

import dotenv from "dotenv";
// import { SubscriberModel } from "./models";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(json());

const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize("sql6504817", "sql6504817", "sgFGYUmWzr", {
  host: "sql6.freesqldatabase.com",
  dialect: "mysql",
  operatorAliases: false,
  dialectOptions: {
    decimalNumbers: true,
  },
});

try {
  (async function () {
    //Bunch of code...
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("The table for the User model was just (re)created!");

    sequelize.query("show tables").then(function (rows) {
      console.log(JSON.stringify(rows));
    });
  })();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const SubscriberModel = sequelize.define("subscriber", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    onUpdate: "SET DEFAULT",
    defaultValue: new Date(),
  },
});

// SubscriberModel.create({ email: "lokesh@gmail.com" });

export default sequelize;
app.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

app.post("/api/v1/notify-me", async (req, res) => {
  try {
    if (!req.body?.email)
      return res.status(404).json({ message: "Email is required" });

    const subscribe = await SubscriberModel.create({ email: req.body.email });
    console.log("lokesh ", subscribe, req.body);
    res.status(201).json({ message: "Success" });
  } catch (_ex) {
    if (_ex?.name === "SequelizeUniqueConstraintError")
      return res.status(202).json({ message: "Already subscribed" });
    res.status(500).json({ message: "Something went wrong! Please try again" });
  }
});

app.get("/items", (req, res) => {
  res.json({ status: true, message: "Fetched all items", data: items });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
