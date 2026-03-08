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
    try {
      const validCheck = jwt.verify(token, secret, {maxAge: expiration});
      if(validCheck) {
        return validCheck;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  verifyTokenBelongsToUser: function(t, user) {
    try {
      const validToken = jwt.verify(t, secret, {maxAge: expiration});
      if(!validToken) {
        return false;
      }
      const tokenInfo = jwt.decode(t);
      if(tokenInfo.data && user && user.email) {
        return tokenInfo.data.email === user.email;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
};