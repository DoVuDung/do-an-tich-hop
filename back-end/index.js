<<<<<<< HEAD
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routers/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const mongodbUri =
  'mongodb+srv://tich-hop:guruacadamy@cluster0.9vllm.mongodb.net/guruAcademy?retryWrites=true&w=majority';
>>>>>>> refs/remotes/origin/master

//middleware
<<<<<<< HEAD
app.use(cors())
app.use(express.json())

=======
app.use(cors());
app.use(express.json()); //parse json from req's body

//routers
app.use('/api/v1/auth', authRoutes);

//error response
app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500;
  const errorMessage = error.message;
>>>>>>> refs/remotes/origin/master

  res.status(status).json({
    ...error,
    message: errorMessage,
  });
});

//connect mongoDB
mongoose
  .connect(mongodbUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected mongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
