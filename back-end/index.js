const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routers/auth');
const coursesRoutes = require('./routers/courses');
const reportRoutes = require('./routers/report');
const courseCategoryRoutes = require('./routers/courseCategories');
const chaptersRoutes = require('./routers/chapters');
const notificationsRoutes = require('./routers/notifications');
const topicsRoutes = require('./routers/topics');
const usersRoutes = require('./routers/users');
const utilsRoutes = require('./routers/utils');
const searchRoutes = require('./routers/search');

//setup
const app = express();
const PORT = process.env.PORT || 5000;
const mongodbUri =
  'mongodb+srv://tich-hop:guruacadamy@cluster0.9vllm.mongodb.net/guruAcademy?retryWrites=true&w=majority';

//middleware
app.use(cors());
app.use(express.json()); //parse json from req's body

//v1 routers
//50 end points in total
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/report', reportRoutes);
app.use('/api/v1', coursesRoutes);
app.use('/api/v1', courseCategoryRoutes);
app.use('/api/v1', chaptersRoutes);
app.use('/api/v1', notificationsRoutes);
app.use('/api/v1', topicsRoutes);
app.use('/api/v1', usersRoutes);
app.use('', utilsRoutes);
app.use('/api/v1', searchRoutes);

//error response
app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500;
  const errorMessage = error.message;
  const errorData = error.data
    ? error.data
    : { ...error, success: undefined, statusCode: undefined };

  res.status(status).json({
    message: errorMessage,
    data: errorData,
    success: false,
    statusCode: status,
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
