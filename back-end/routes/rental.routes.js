import rentals from "../controllers/rental.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/", rentals.create);
  
    router.get("/", rentals.findAll);

    router.get("/:_id", rentals.findOne);
  
    router.put("/:_id", rentals.update);
  
    router.delete("/:_id", rentals.deleteOne);
  
    app.use('/api/rentals', router);
  };
  