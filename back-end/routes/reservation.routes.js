import reservations from "../controllers/reservation.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/", reservations.create);
  
    router.get("/", reservations.findAll);

    router.get("/:id", reservations.findOne);
  
    router.put("/:id", reservations.update);
  
    router.delete("/:id", reservations.deleteOne);
  
    app.use('/api/reservations', router);
  };
  