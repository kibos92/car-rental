export default app => {
    const departments = require("../controllers/department.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", departments.create);
  
    router.get("/", departments.findAll);

    router.get("/:id", departments.findOne);
  
    router.put("/:id", departments.update);
  
    router.delete("/:id", departments.delete);
  
    app.use('/api/rentals', router);
  };
  