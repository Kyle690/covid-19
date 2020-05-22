// require models in, only need to declare one time;
require('./src/models/entery');
require('./src/models/lockdownLevel');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./src/config/keys');

// import Routes
const AllRoutes = require('./src/routes/all');
const LatestRoutes = require('./src/routes/latest');
const DailyRoutes = require('./src/routes/daily');
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
app.use(express.static(path.join(__dirname,'client','covid-app','build')))
app.use(cors());
app.use(AllRoutes);
app.use(LatestRoutes);
app.use(DailyRoutes);


if(process.env.NODE_ENV==='production'){
    // express will serve up production assets, like our main.js file or main.css file
    app.use(express.static('client/build'));

    // express will serve up the index.html file if it doesnt recognize the route
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const PORT = process.env.PORT||4000;

app.listen(PORT,()=>{
    console.log('Server Running on port 4000')
});
