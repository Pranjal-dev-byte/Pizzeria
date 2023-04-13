const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;


// create some helper functions to work on the database
const createUser = async ({ username, password, email }) => {
  return await User.create({ username, password, email });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};