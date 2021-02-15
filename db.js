var mongoose = require('mongoose');

 var mongoURI = "mongodb://localhost:27017/digital-App-4";

// var mongoURI = "mongodb+srv://rajasaini:sainiraja@cluster0.xgfaf.mongodb.net/task22?retryWrites=true&w=majority";

// var mongoURI="mongodb+srv://sainiuser:sainipassword@cluster0.pdcb8.mongodb.net/testdb?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongodb connection open");
});
exports.db = db;