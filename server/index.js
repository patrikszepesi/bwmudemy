const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const Rental = require('./models/rental')
const House = require('./models/house')
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings'),
      imageUploadRoutes = require('./routes/image-upload'),
      reviewRoutes=require('./routes/reviews');
      houseRoutes = require('./routes/houses');
      houseBookingRoutes = require('./routes/housebookings');

mongoose.connect(config.DB_URI).then(() => {

});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/', imageUploadRoutes);
app.use('/api/v1/houses',houseRoutes);
app.use('/api/v1/housebookings',houseBookingRoutes);




if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'build');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running !');
});
