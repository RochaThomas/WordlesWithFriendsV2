
const express = require('express');
const cors = require('cors');
const app = express();
const PORT  = 8000;

const DB = "wordle_w_friends";

app.use(express.json(), cors(), express.urlencoded({extended: true}));

require('./config/mongoose.config')(DB);

require('./routes/creator.routes')(app)
require('./routes/guesser.routes')(app)

app.listen(PORT, () => console.log(`>>>>> Server up on port ${PORT} <<<<<`));