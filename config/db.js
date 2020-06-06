const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('')
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
    useNewUrlParser: true,
    useFindAndModify: false
});

