const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

const port = process.env.port || 3000;

app.use('/', express.static(path.join(__dirname, '../static')));

// app.use('/*', function(req, res) {
//   let index = fs.readFileSync(path.join(__dirname, 'static/index.html'), 'utf8');
//   res.send(index);
// });

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.info(`  App start at http://localhost:${port}`);
});
