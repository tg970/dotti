// DEPENDENCIES
const express    = require('express');
const session    = require('express-session');
const morgan     = require('morgan');
const app        = express();
require('pretty-error').start();


// CONFIG
const PORT       = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny', {
  skip: function(req, res) { return req.url.indexOf('/socket.io') !== -1 }
}));

app.listen(PORT, () => {
   console.log('Server OK');
});
