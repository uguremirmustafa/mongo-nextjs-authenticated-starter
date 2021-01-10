/** @format */

import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
connectDB();
export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
    default:
      return res.status(500).json({ err: 'something went wrong on the server' });
  }
};
const register = async (req, res) => {
  try {
    const { email, name, password, cPassword } = req.body;

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ err: 'This email already exists!' });

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new Users({ email, name, password: passwordHash, cPassword });
    await newUser.save();
    res.json({ msg: 'register success' });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
