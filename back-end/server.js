import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index.js";
import rental from "./routes/rental.routes.js";
import department from "./routes/department.routes.js";
import car from "./routes/car.routes.js";
import reservation from "./routes/reservation.routes.js";
import user from "./routes/user.routes.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import configurePassport from './auth/passport-local.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

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
reservation(app);
user(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});