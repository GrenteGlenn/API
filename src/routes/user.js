import express from "express";
import { createNewUser, Updated, deleteUserById } from "../controller/userController.js";
import { allUsers } from "../controller/userController.js";

const route = express.Router();

route.get("/", allUsers);

route.post("/create", createNewUser);

route.patch("/update/:id", Updated);

route.delete("/:id", deleteUserById)

export default route;
