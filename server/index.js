const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
