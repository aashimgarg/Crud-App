const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require("./routes/usersRoutes");

const portNumber = process.env.PORT || 3000;
const url = 'mongodb+srv://aashimgarg:aashimgarg@shop-app.7uqv5.mongodb.net/aashim?retryWrites=true&w=majority';

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
});

connect
  .then(
    () => {
      console.log("Connected correctly to Server");
    },
    (err) => console.log(err)
  )
  .catch((err) => next(err));

app.use(express.static("public"));

app.listen(portNumber, function () {
  console.log(`Connected to localhost: ${portNumber}`);
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Mounting Routes
app.use("/", usersRoutes);

app.use((req, res, next) => {
  res.status(404).render('Not Found');
});