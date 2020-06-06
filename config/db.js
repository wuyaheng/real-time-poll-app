const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));




