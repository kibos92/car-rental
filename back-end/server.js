import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index.js";
import rental from "./routes/rental.routes.js";
import department from "./routes/department.routes.js";
import car from "./routes/car.routes.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

rental(app);
department(app);
car(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});