/** @format */

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '@utils/generateToken';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await login(req, res);
      break;
    default:
      return res.status(500).json({ err: 'something went wrong on the server' });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ err: 'This user does not exist!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ err: 'incorrect password' });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: 'login success',
      refresh_token,
      access_token,
      user: {
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
