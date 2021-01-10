/** @format */

module.exports = {
  env: {
    BASE_URL: 'https://mongo-nextjs-authenticated-starter.vercel.app/',
    MONGODB_URL: process.env.MONGODB_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },
};
