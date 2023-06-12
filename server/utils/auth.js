const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
authMiddleware: function ({ req }) {
 
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
    token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
    return req;
    }

    try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    }
    catch (error) {
    console.log('there was an error with the token: ' , error);
    }
    return req;
  },
  
  signToken: function ({ firstName, lastName, email, role, _id }) {
  const payload = { firstName, lastName, email, role, _id };
    
    return jwt.sign(
      { data: payload },
        secret,
      { expiresIn: expiration }
    );
  },

  verifyToken: function(token) {
    const validCheck = jwt.verify(token, secret, {maxAge: expiration});
    if(validCheck !== null || undefined || "") {
      return validCheck;
    } else {
      return false;
    }
  },

  verifyTokenBelongsToUser: function(t, user) {
    const validToken = jwt.verify(t, secret, {maxAge: expiration});
    if(validToken == null || undefined || "") {
      return false;
    }
    const tokenInfo = jwt.decode(t);
    if(tokenInfo.data && user.email) {
      const tokenEmail = tokenInfo.data.email || 'no token email';
      const userEmail = user.email || 'no user email';
      if(tokenEmail === userEmail) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};