/** @format */

import mongoose from 'mongoose';
const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected');
    return;
  }
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        throw err;
      }
      console.log('connected to mongodb');
    }
  );
};
export default connectDB;
