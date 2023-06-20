import db from "../models/index.js";

const Reservation = db.reservations;

const create = (req, res) => {
    if (!req.body.insurerName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const reservation = new Reservation({
        carId: req.body.carId,
        userId: req.body.userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        insurerName: req.body.insurerName,
        claimNumber:req.body.claimNumber
    });
  
    reservation
      .save(reservation)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Reservation."
        });
      });
  };

  const findOne = (req, res) => {
    const id = req.params.id;
  
    Reservation.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Reservation with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Reservation with id=" + id });
      });
  };

  const findAll = (req, res) => {
    Reservation.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving reservations."
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
  
    Reservation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found!`
          });
        } else res.send({ message: "Reservation was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Reservation with id=" + id
        });
      });
  };

  const deleteOne = (req, res) => {
    const id = req.params.id;
  
    Reservation.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`
          });
        } else {
          res.send({
            message: "Reservation was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Reservation with id=" + id
        });
      });
  };

  export default {create, findOne, findAll, update, deleteOne}