 
const express = require("express");
const submitRouter = express.Router();
const tokenMw = require("../middleware/tokenMw")
const submitCode = require("../controllers/userSubmission")

submitRouter.post("/submit/:id",tokenMw,submitCode);