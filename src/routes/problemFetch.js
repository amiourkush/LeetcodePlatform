const express = require("express");
const problemRouter = express.Router();
const adminMw=require("../middleware/adminMw")
const createProblem = require("../controllers/userProblem");


problemRouter.post("/create",adminMw,createProblem);
problemRouter.get("/:id",problemFetch);
problemRouter.patch("/:id",problemUpdate);
problemRouter.delete("/:id",problemDelete);
problemRouter.get("/",problemAllFetch)
problemRouter.get("/user",solvedProblem)

module.exports= problemRouter;