import departments from "../controllers/department.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/:rentalId/departments", departments.create);
  
    router.get("/:rentalId/departments", departments.findAll);

    router.get("/:rentalId/departments/:id", departments.findOne);

    router.get("departments/:id", departments.findOne)

    router.get("/departments", departments.findAllDepartments);
  
    router.put("/:rentalId/departments/:id", departments.update);
  
    router.delete("/:rentalId/departments/:id", departments.deleteOne);
  
    app.use('/api/rentals', router);

    app.use(router);
  };
  