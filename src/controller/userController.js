import { createUserService, deleteUser } from "../models/userModels.js";
import { getAllUsers } from "../models/userModels.js";
import { updateUsers } from "../models/userModels.js";

const handlerResponse = (res, status, message, data = null) => {
  res.status(status).json({
    data,
    message,
    status,
  });
};

export const allUsers = async (req, res, next) => {
  try {
    const getUsers = await getAllUsers();
    handlerResponse(res, 201, "All Users have get!", getUsers);
  } catch (error) {
    return next(error);
  }
};

export const createNewUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handlerResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    return next(error);
  }
};

export const Updated = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { email } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).send("Name or email is required");
    }
    const userUpdate = await updateUsers(id, name, email);

    if (!userUpdate) {
      return res.status(400).send("Error when updated");
    }
    handlerResponse(res, 200, "updated is done", userUpdate);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);
    handlerResponse(res, 200, "user has been deleted", user);
  } catch (error) {
    return next(error);
  }
};
