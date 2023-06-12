import db from "../models/index.js";

const Car = db.cars;
const Department = db.departments;

const findAllCars = (req, res) => {
  Car.find()
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
  if (!req.body.brand) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const departmentId = req.params.departmentId;

  if (!departmentId) {
    res.status(400).send({ message: "Department ID is required!" });
    return;
  }

  Department.findById(departmentId)
    .then(department => {
      if (!department) {
        res.status(404).send({ message: `Department with id=${departmentId} not found!` });
        return;
      }

      const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        plateNumber: req.body.plateNumber,
        year: req.body.year,
        departmentId: departmentId
      });

      car
        .save()
        .then(data => {
          department.cars.push(data._id); 
          department.save()
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
          err.message || `Error retrieving Department with id=${departmentId}.`
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
    const departmentId = req.params.id;
    Car.find({ department: departmentId })
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
    const carId = req.params.id;
    const departmentId = req.params.departmentId;
  
    Car.findByIdAndRemove(carId)
      .then(deletedDepartment => {
        if (!deletedDepartment) {
          res.status(404).send({
            message: `Cannot delete Car with id=${carId}. Maybe Department was not found!`
          });
          return;
        }
  
        Department.findByIdAndUpdate(
          departmentId,
          { $pull: { cars: carId } },
          { new: true }
        )
          .then(updatedRental => {
            if (!updatedRental) {
              res.status(404).send({
                message: `Cannot delete Car with id=${carId} from Rental with id=${departmentId}. Maybe Rental was not found!`
              });
            } else {
              res.send({
                message: "Department was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Could not delete Department with id=${carId} from Rental with id=${departmentId}.`
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete Department with id=${carId}.`
        });
      });
  };

  export default {create, findOne, findAll, update, deleteOne, findAllCars}