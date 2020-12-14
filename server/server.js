const express = require("express");
require("dotenv").config(); // for loading environment variables
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("./routes/api/users");





const client =  require("prom-client")
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({timeout: 5000})

const counter = new client.Counter({
   name: 'node_request_opertions_total',
   help: 'The total number of processed requests'
});

const histogram =  new  client.Histogram({
   name: 'node_request_duration_seconds',
   help: 'Histogram for duration in seconds',
   buckets: [1, 2, 5, 6, 10] 
});

const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// db configuration
const MONGO_URI = process.env.MONGO_URI;
mongoose
   .connect(MONGO_URI, { useNewUrlParser: true })
   .then(() => console.log("Mongo Connection successful"))
   .catch(err => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/users", users);
app.use("/api/posts/", require("./routes/api/posts"));

if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

app.get('/',(req,res) => {
   var start = new Date()
   var simulateTime = 1000

   setTimeout(function(argument){
      var end = new Date() - start
      histogram.observe(end /1000);},simulateTime
   )
counter.inc();
res.send('Hello world');
});

app.get('/metrics',(req,res) => {

   res.set('Content-Type',client.register.contentType)
   res.end(client.register.metrics())
})




app.get("/test", (req, res) => {
   res.send("hello");
 });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Nu Tweets redis server is running on port ${PORT}`));
