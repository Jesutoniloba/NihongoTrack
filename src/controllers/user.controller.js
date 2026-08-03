import {
  getAllUserssService,
  getUserService,
  createUsersService,
  deleteUsersService,
  updateUsersService,
} from "../models/user-model.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUserssService();
    handleResponse(res, 200, "Users fetched sucessfully", users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not Found");
    handleResponse(res, 200, "User fetched sucessfully", user);
  } catch (err) {
    next(err);
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const { username, email, password_hash } = req.body;
    const user = await updateUsersService(
      username,
      email,
      password_hash,
      req.params.id,
    );
    if (!user) return handleResponse(res, 404, "User not Found");
    handleResponse(res, 201, "User updated sucessfully", user);
  } catch (err) {
    next(err);
  }
};

//
const deleteUsers = async (req, res, next) => {
  try {
    const user = await deleteUsersService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not Found");
    handleResponse(res, 201, "User deleted sucessfully");
  } catch (err) {
    next(err);
  }
};
export { getAllUsers, getUser, updateUsers, deleteUsers };
