import db from "../models/index.js";

const Department = db.departments;
const Rental = db.rentals;

const findAllDepartments = (req, res) => {
  Department.find()
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

const create = (req, res) => {
  if (!req.body.location) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const rentalId = req.params.rentalId;

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
        .save()
        .then(data => {
          rental.departments.push(data._id); 
          rental.save()
            .then(() => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while updating Rental."
              });
            });
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
    const rentalId = req.params.id;
    Department.find({ rental: rentalId })
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
    const departmentId = req.params.id;
    const rentalId = req.params.rentalId;
  
    Department.findByIdAndRemove(departmentId)
      .then(deletedDepartment => {
        if (!deletedDepartment) {
          res.status(404).send({
            message: `Cannot delete Department with id=${departmentId}. Maybe Department was not found!`
          });
          return;
        }
  
        Rental.findByIdAndUpdate(
          rentalId,
          { $pull: { departments: departmentId } },
          { new: true }
        )
          .then(updatedRental => {
            if (!updatedRental) {
              res.status(404).send({
                message: `Cannot delete Department with id=${departmentId} from Rental with id=${rentalId}. Maybe Rental was not found!`
              });
            } else {
              res.send({
                message: "Department was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Could not delete Department with id=${departmentId} from Rental with id=${rentalId}.`
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete Department with id=${departmentId}.`
        });
      });
  };

  export default {create, findOne, findAll, update, deleteOne, findAllDepartments}