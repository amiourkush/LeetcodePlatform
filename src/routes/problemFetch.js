const express = require("express");
const problemRouter = express.Router();
const adminMw=require("../middleware/adminMw")
const {createProblem,problemUpdate,problemDelete,getProblemById,getAllProblem} = require("../controllers/userProblem");
const tokenMw = require("../middleware/tokenMw")


problemRouter.post("/create",adminMw,createProblem);
problemRouter.put("/update/:id",adminMw,problemUpdate);
problemRouter.delete("/delete/:id",adminMw,problemDelete);


problemRouter.get("/getProblemById/:id",tokenMw,getProblemById);
problemRouter.get("/getAllProblem",tokenMw,getAllProblem)
problemRouter.get("/solvedProblemByUser",tokenMw,solvedAllProblemByUser)

module.exports= problemRouter;