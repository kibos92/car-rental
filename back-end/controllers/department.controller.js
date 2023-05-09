import db from "../models/index.js";

const Department = db.departments;
const Rental = db.rentals;

const create = (req, res) => {
  if (!req.body.location) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const rentalId = req.body.rentalId;

  if (!rentalId) {
    res.status(400).send({ message: "Rental ID is required!" });
    return;
  }

  Rental.findById(rentalId)
    .then(rental => {
      if (!rental) {
        res.status(404).send({ message: `Rental with id=${rentalId} not found!` });
        return;
      }

      const department = new Department({
        location: req.body.location,
        address: req.body.address,
        contactDetails: req.body.contactDetails,
        cars: req.body.cars,
        rentalId: rentalId
      });

      department
        .save(department)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Department."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Rental with id=${rentalId}.`
      });
    });
};

  const findOne = (req, res) => {
    const id = req.params.id;
  
    Department.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Department with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Department with id=" + id });
      });
  };

  const findAll = (req, res) => {
    Department.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving departments."
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
  
    Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Department with id=${id}. Maybe Department was not found!`
          });
        } else res.send({ message: "Department was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Department with id=" + id
        });
      });
  };

  const deleteOne = (req, res) => {
    const id = req.params.id;
  
    Department.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
          });
        } else {
          res.send({
            message: "Department was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Department with id=" + id
        });
      });
  };

  export default {create, findOne, findAll, update, deleteOne}