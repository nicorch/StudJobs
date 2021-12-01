const express = require("express");
const router = express.Router();
const Joi = require("joi");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");

const schema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  town: Joi.string().required(),
  address: Joi.string().allow("").optional(),
  type: Joi.string().required(),
  age: Joi.number().integer().optional().allow(null),
  phone: Joi.number().integer().optional().allow(null),
  companyName: Joi.string().optional().allow("").allow(null),
  disponibility: Joi.boolean().optional().allow(null),
  permis: Joi.boolean().optional().allow(null)
};

router.post("/", validateWith(schema), (req, res) => {
  const data = req.body;
  if (usersStore.getUserByEmail(data.email))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  const user = { firstName, lastName, email, password, town, address, type, age, phone, companyName, disponibility, permis };
  usersStore.addUser(user);

  res.status(201).send(user);
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
