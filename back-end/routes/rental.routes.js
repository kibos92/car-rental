export default app => {
    const rentals = require("../controllers/rental.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", rentals.create);
  
    router.get("/", rentals.findAll);

    router.get("/:id", rentals.findOne);
  
    router.put("/:id", rentals.update);
  
    router.delete("/:id", rentals.delete);
  
    app.use('/api/rentals', router);
  };
  