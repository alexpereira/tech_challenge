import bcrypt from 'bcryptjs';
import validator from 'validator';

import db from '../db';

async function newUser(req, res, next) {

  let payload = {
    error: {
      code: null
    },
    result: null
  }

  // 1. Receive the username being sent as a JSON object in the format
  // {“username”: “joe”, “password”: “hello”}

  let newUser = {
    username: req.body.username,
    password: req.body.password,
  };

  const validationPayload = validate(newUser, payload);

  if (validationPayload.error.code) return res.status(400).json(validationPayload);

  // 4. Hash the password (Hint: bcrypt)
  newUser.password = bcrypt.hashSync(newUser.password)

  // 5. Once validated the username and the hashed password should be stored in
  // a SQL Database (credentials provided below) in a table called Users
  // (You will need to create this table). The table should have columns:
  // username and password. Make sure that duplicate usernames are not saved
  // in the DB. If it already exists send back an error code of “DUPLICATE_USER”.

  const usernameExists = await db
    .table('users')
    .where('username', '=', newUser.username)
    .first();

  if (usernameExists) {
    payload.error.code = 'DUPLICATE_USER';
    return res.status(400).json(payload);
  }

  const userCreated = await db
    .table('users')
    .insert(newUser)
    .returning('id');

  if (userCreated) {
    payload.result = 'SUCCESS';
    return res.status(200).json(payload);
  }
}

function validate(user, payload) {

  if (typeof user.username === 'undefined' || typeof user.password === 'undefined') {
    payload.error.code = 'INVALID'
    return payload;
  }

  // 2. Verify that the username is at minimum 3 characters and contains only
  // letters. If this is violated return “INVALID_USERNAME” as the error code.
  // See the Return Formats Section for more detail


  if (!validator.isLength(user.username, { min: 3 } )) {
    payload.error.code = 'INVALID_USERNAME'
  } else if (!validator.isAlpha(user.username)) {
    payload.error.code = 'INVALID_USERNAME'
  }

  // 3. Verify that the password is at least 8 characters long and contains only
  // numbers and letters. No other characters. If it violates this an error
  //should be returned with code “INVALID_PASSWORD” as the error code.
  if (!validator.isLength(user.password, { min: 8 } )) {
    payload.error.code = 'INVALID_PASSWORD'
  } else if (!validator.isAlphanumeric(user.password)) {
    payload.error.code = 'INVALID_PASSWORD'
  }

  return payload;
}

module.exports = {
  newUser
};
