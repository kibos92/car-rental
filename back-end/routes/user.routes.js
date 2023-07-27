import users from "../controllers/user.controller.js";
import express from 'express';

export default app => {
    const router = express.Router()
    
    router.post("/register", users.register);

    router.post("/login", users.login);

    router.post("/logout", users.logout);

    router.get("/user", users.findOne);
  
    router.get("/", users.findAll);

    router.put("/:id", users.update);
  
    router.delete("/:id", users.deleteOne);
  
    app.use('/api', router);
  };
  