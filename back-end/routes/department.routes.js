import departments from "../controllers/department.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/:rentalId/departments", departments.create);
  
    router.get("/:rentalId/departments", departments.findAll);

    router.get("/:rentalId/departments/:id", departments.findOne);
  
    router.put("/:rentalId/departments/:id", departments.update);
  
    router.delete("/:rentalId/departments/:id", departments.deleteOne);
  
    app.use('/api/departments', router);
  };
  