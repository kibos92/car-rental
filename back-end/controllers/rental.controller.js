import db from "../models/index.js";

const Rental = db.rentals;

const create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const rental = new Rental({
      title: req.body.title,
      headquarters: req.body.headquarters,
      contactDetails: req.body.contactDetails,
      departments: req.body.departments
    });
  
    rental
      .save(rental)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Rental."
        });
      });
  };

  const findOne = (req, res) => {
    const id = req.params.id;
  
    Rental.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Rental with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Rental with id=" + id });
      });
  };

  const findAll = (req, res) => {
    Rental.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rentals."
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
  
    Rental.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Rental with id=${id}. Maybe Rental was not found!`
          });
        } else res.send({ message: "Rental was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Rental with id=" + id
        });
      });
  };

  const deleteOne = (req, res) => {
    const id = req.params.id;
  
    Rental.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Rental with id=${id}. Maybe Rental was not found!`
          });
        } else {
          res.send({
            message: "Rental was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Rental with id=" + id
        });
      });
  };

  export default {create, findOne, findAll, update, deleteOne}