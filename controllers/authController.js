const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const defaultAvatar = 'https://lh3.googleusercontent.com/a/ACg8ocJlOcLZVwFu01wKTThYkr_PnyrC3FwbQeEwERd5xpiaRotkalg=s96-c';

const login = async (req, res) => {
  const { userId, name, email, photoURL } = req.body;
  console.log(req.body);

  const user = await User.findOne({ where: { userId } });
  if (!user) {
    const newUsertoCreate = {
      username: name ? name : `Wontollero-${randomNumber}`,
      email,
      userId,
      isVerified: false,
      isAdmin: false,
      avatar: photoURL ? photoURL : defaultAvatar,
      password: 'NA'
    }
    const newUser = await User.create(newUsertoCreate);
    return res.status(400).json(newUser);
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // res.json({ token });

  res.status(200).json({
    message: 'Existing user logged in successfully',
    data: {
      userId: user.userId,
      displayName: user.username,
      email: user.email,
      photoURL: user.avatar,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    },
    token
  });

};

module.exports = { login };