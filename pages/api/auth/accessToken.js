/** @format */

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '@utils/generateToken';

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).sjon({ err: 'Please login now!' });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result) return res.status(400).json({ err: 'your token is incorrect or has expired' });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: 'user does not exist' });

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
