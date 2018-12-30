require('dotenv').config();

const environmentVariables = ['MICROSERVICE_1'];

environmentVariables.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
<% services.forEach((service) => { %>
  <%= service.toUpperCase() %>: process.env.<%= service.toUpperCase() %>,
<% }) %>
};