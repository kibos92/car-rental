import departments from "../controllers/department.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/", departments.create);
  
    router.get("/", departments.findAll);

    router.get("/:id", departments.findOne);
  
    router.put("/:id", departments.update);
  
    router.delete("/:id", departments.deleteOne);
  
    app.use('/api/departments', router);
  };
  