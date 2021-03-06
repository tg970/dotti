// DEPENDENCIES
const express    = require('express');
const session    = require('express-session');
const morgan     = require('morgan');
const app        = express();
require('pretty-error').start();


// CONFIG
const PORT       = process.env.PORT || 3000;

// CONFIG Morgan skip

skipLog = (req, res) => {
  if (req.url.indexOf('/socket.io') !== -1) return true;
  if (req.url.indexOf('/browser-sync/index.min.js.map') !== -1) return true;
  return false;
}

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny', {
  skip: skipLog
}));

app.listen(PORT, () => {
   console.log('Server OK');
});
