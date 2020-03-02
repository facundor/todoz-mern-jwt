require('dotenv').config({ path: 'local.env' });
const server = require('./config/server');
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Listening on port: " + port);
});
