const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mdp_products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then((db) => console.log('DB connected!'))
.catch((err) => console.error(err))
