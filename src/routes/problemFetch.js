const express = require("express");
const problemRouter = express.Router();


problemRouter.post("/create",problemCreate);
problemRouter.get("/:id",problemFetch);
problemRouter.patch("/:id",problemUpdate);
problemRouter.delete("/:id",problemDelete);
problemRouter.get("/",problemAllFetch)
problemRouter.get("/user",solvedProblem)