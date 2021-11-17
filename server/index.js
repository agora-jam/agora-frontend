const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4500;

const STATIC_FILES = path.join(__dirname, '../public');
const MAIN_HTML = path.join(__dirname, '../public/index.html');

// Logger
app.use(morgan('tiny'));

// Serve Files
app.use(express.static(STATIC_FILES));
app.get('*', (req, res) => res.sendFile(MAIN_HTML));

// Initialize
app.listen(port, (error) => {
  if (error) return console.error(error);

  console.log(`Server listening on port ${port}...`);
});
