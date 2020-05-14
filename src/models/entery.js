const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    timestamp:Number,
    confirmed:{
        type:Number,
        required:true
    },
    recoveries:{
        type:Number,
        required:true
    },
    deaths:{
        type:Number,
        required:true
    },
    ldLevel:{
        type:Number,
        required:true
    }
});

mongoose.model('Entry',entrySchema);