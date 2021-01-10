/** @format */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'ayni mail kullanilmis'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: 'String',
      default:
        'https://res.cloudinary.com/duco3wsco/image/upload/v1610221357/avatar-placeholder_viumob.gif',
    },
  },
  {
    timestamps: true,
  }
);
let Dataset = mongoose.models.user || mongoose.model('user', userSchema);
export default Dataset;
