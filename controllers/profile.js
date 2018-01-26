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

  // 1. Receive the JWT as {“token”: <JWT will be here>}

  let user = {
    token: req.body.token,
  };

  // 2. Verify that the JWT is valid.
  const userVerified = jwt.verify(user.token, 'flame');

  // 3. Verify that the username stored in the JWT is “joe”

  if (userVerified && userVerified.user.username) {
    // 4. If valid return this object: {“great”: “success”}
    res.status(200).json({great: "success"});
  } else {
    // 5. Any error should return “UNAUTHORIZED” as the error code
    payload.error.code = 'UNAUTHORIZED';
    res.status(400).json(payload);
  }
}

module.exports = {
  user
};
