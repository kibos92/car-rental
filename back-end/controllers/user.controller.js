import db from "../models/index.js";
import bcrypt from 'bcryptjs'
import passport from 'passport'

const User = db.users;

const register = (req, res) => {
  User.findOne({ username: req.body.username }, (err, doc) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (doc) {
      return res.status(400).send("User Already Exists");
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          contactDetails: req.body.contactDetails,
          isAdmin: false
        });
        newUser.save((err) => {
          if (err) {
            return res.status(500).send("Internal Server Error");
          }
          res.send("User Created");
        });
      });
    }
  });
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      return res.status(400).send("No User Exists");
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).send("Logout failed");
    } else {
      res.send("Successfully Logged Out");
    }
  });
};

  const findOne = (req, res) => {
    res.send(req.user);
  };

  const findAll = (req, res) => {
    User.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

  const update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

  const deleteOne = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

  export default {register, login, logout,  findOne, findAll, update, deleteOne}