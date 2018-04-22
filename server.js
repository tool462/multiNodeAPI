const {monitorServicePort}  = require('./config');
const express               = require('express');
const bodyParser            = require('body-parser');
const app                   = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(monitorServicePort, () => {
  console.log('We are live on ' + monitorServicePort);
});
