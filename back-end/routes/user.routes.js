import users from "../controllers/user.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/", users.create);
  
    router.get("/", users.findAll);

    router.get("/:id", users.findOne);
  
    router.put("/:id", users.update);
  
    router.delete("/:id", users.deleteOne);
  
    app.use('/api/users', router);
  };
  