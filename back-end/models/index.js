import url from "../config/db.config.js";

import mongoose from "mongoose";

const db = {};
db.mongoose = mongoose;
db.url = url;
db.rentals = require("./rental.model.js")(mongoose);
db.departments = require("./department.model.js")(mongoose);
db.cars = require("./car.model.js")(mongoose);

export default db;