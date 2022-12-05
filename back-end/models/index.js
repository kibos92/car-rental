import url from "../config/db.config.js";
import rentals from "./rental.model.js";
import departments from "./department.model.js";
import cars from "./car.model.js";
import mongoose from "mongoose";

const db = {};
db.mongoose = mongoose;
db.url = url;
db.rentals = rentals(mongoose);
db.departments = departments(mongoose);
db.cars = cars(mongoose);

export default db;