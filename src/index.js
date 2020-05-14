// require models in, only need to declare one time;
require('./models/entery');
require('./models/lockdownLevel');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/urls');

// import Routes
const AllRoutes = require('./routes/all');
const LatestRoutes = require('./routes/latest');
const DailyRoutes = require('./routes/daily');
// start of the application
const app = express();

// data base stuff
mongoose.connect(keys.urlForOnline,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    });
//mongoose connection
mongoose.connection.on('connected',()=>{
    console.log('Database Connected');
})
mongoose.connection.on('error',(err)=>{
    console.log(`Database Error:${err}`);
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'react','covid-app','build')))
app.use(cors());
app.use(AllRoutes);
app.use(LatestRoutes);
app.use(DailyRoutes);

app.get('/', function (req, res) {

   return res.sendFile(path.join(__dirname,'react','covid-app','build','index.html'));

    //res.sendFile(path.join(__dirname, '/build', 'index.html'));
});


app.get('/home',(req,res)=>{

    res.redirect('/');
});

app.listen(4000,()=>{
    console.log('Server Running on port 4000')
});
