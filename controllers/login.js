import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import db from '../db';

async function user(req, res, next) {

  let payload = {
    error: {
      code: null
    },
    result: null
  }

  // 1. Receive the username being sent as a JSON object in the format
  // {“username”: “joe”, “password”: “hello”}

  let user = {
    username: req.body.username,
    password: req.body.password,
  };

  const validationPayload = validate(user, payload);

  if (validationPayload.error.code) return res.status(400).json(validationPayload);

  // 3. Pull the user from the DB by username and verify that the password hashes match.
  //    a. If there is no user by that username return “NOT_FOUND” as the error code

  const usernameExists = await db
    .table('users')
    .where('username', '=', user.username)
    .first();

  if (!usernameExists) {
    payload.error.code = 'NOT_FOUND';
    return res.status(400).json(payload);
  }

  //    b. If the passwords do not match return “INVALID”

  const authenticated = bcrypt.compareSync(user.password, usernameExists.password);

  if (!authenticated) {
    payload.error.code = 'INVALID';
    return res.status(400).json(payload);
  } else {

    //  4. If they match create a JWT that contains the username and return the
    // JWT as the result
    payload.result = await jwt.sign({ user: user }, 'flame');
    return res.status(200).json(payload);
  }
}

function validate(user, payload) {

  if (typeof user.username === 'undefined' || typeof user.password === 'undefined') {
    payload.error.code = 'INVALID'
    return payload;
  }

  // 2. For security purposes, you should ensure that the username and password
  // meet the same registration criteria before checking if it exists in our db.
  //  a. Verify that the username is at minimum 3 characters and contains
  //  only letters. If this is violated return “INVALID”
  if (!validator.isLength(user.username, { min: 3 } )) {
    payload.error.code = 'INVALID'
  } else if (!validator.isAlpha(user.username)) {
    payload.error.code = 'INVALID'
  }

  //  b. Verify that the password is at least 8 characters long and contains
  //  only numbers and letters. No other characters. If it violates this an
  //  error should be returned with code “INVALID”

  if (!validator.isLength(user.password, { min: 8 } )) {
    payload.error.code = 'INVALID'
  } else if (!validator.isAlphanumeric(user.password)) {
    payload.error.code = 'INVALID'
  }

  return payload;
}

module.exports = {
  user
};
