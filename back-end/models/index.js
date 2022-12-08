import url from "../config/db.config.js";
import rentals from "./rental.model.js";
import departments from "./department.model.js";
import cars from "./car.model.js";
import mongoose from "mongoose";

const db = {
    mongoose: mongoose,
    url: url,
    rentals: rentals(mongoose),
    departments: departments(mongoose),
    cars: cars(mongoose)
};

export default db;