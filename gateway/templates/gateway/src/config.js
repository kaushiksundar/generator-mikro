require('dotenv').config();

const environmentVariables = ['NODE_ENV', 'PORT'];

environmentVariables.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
};