const mongoose = require('mongoose');

const ldLevelSchema = mongoose.Schema({
    level:{
        type:Number,
        required:true
    }
});

mongoose.model('ldLevel',ldLevelSchema);