import cars from "../controllers/car.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/:departmentId/cars", cars.create);
  
    router.get("/:departmentId/cars", cars.findAll);

    router.get("/cars", cars.findAllCars);

    router.get("/:departmentId/cars/:id", cars.findOne);
  
    router.put("/:departmentId/cars/:id", cars.update);
  
    router.delete("/:departmentId/cars/:id", cars.deleteOne);
  
    app.use('/api/rentals/:rentalId/departments', router);

    app.use(router);
  };
  