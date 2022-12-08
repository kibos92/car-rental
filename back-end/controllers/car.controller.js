import db from "../models/index.js";

const Car = db.cars;

const create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const car = new Car({
      title: req.body.title,
      description: req.body.description
    });
  
    car
      .save(car)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Car."
        });
      });
  };

  const findOne = (req, res) => {
    const id = req.params.id;
  
    Car.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Car with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Car with id=" + id });
      });
  };

  const findAll = (req, res) => {
    Car.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
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
  
    Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Car with id=${id}. Maybe Car was not found!`
          });
        } else res.send({ message: "Car was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Car with id=" + id
        });
      });
  };

  const deleteOne = (req, res) => {
    const id = req.params.id;
  
    Car.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
          });
        } else {
          res.send({
            message: "Car was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Car with id=" + id
        });
      });
  };

  export default {create, findOne, findAll, update, deleteOne}