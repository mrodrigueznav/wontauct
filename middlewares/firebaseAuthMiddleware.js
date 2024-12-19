const admin = require('../config/firebaseAdmin');


const authenticateFirebaseToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateFirebaseToken;