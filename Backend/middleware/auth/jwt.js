const jwt = require('jsonwebtoken');

const secretKey = 'ahmedsecret';


// Verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(401).json({ message: 'Invalid token', error: ex.message });
  }
};
module.exports = verifyToken;