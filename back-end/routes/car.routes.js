import cars from "../controllers/car.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/", cars.create);
  
    router.get("/", cars.findAll);

    router.get("/:id", cars.findOne);
  
    router.put("/:id", cars.update);
  
    router.delete("/:id", cars.deleteOne);
  
    app.use('/api/cars', router);
  };
  