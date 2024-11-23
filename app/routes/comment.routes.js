module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", comments.create);
  
    router.get("/", comments.findAll);
  
    router.get("/:id", comments.findOne);
  
    router.put("/:id", comments.update);
  
    router.delete("/:id", comments.delete);
  
    router.delete("/", comments.deleteAll);
  
    app.use('/api/comments', router);
  };
  