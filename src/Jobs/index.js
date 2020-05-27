require('../models/entery');
require('../models/lockdownLevel');
const mongoose = require('mongoose');
const axios =require('axios');
const cherrio = require('cheerio');
const keys = require('../config/keys');

const url ='https://www.worldometers.info/coronavirus/country/south-africa/';
const getData = async()=>{
    const result = await axios(url);
    const $ = cherrio.load(result.data);
    const str =$('#maincounter-wrap').text();
    const data =str.split('\n').filter(d=>d!=='');

    const confirmed =parseInt(data[1].replace(',',''));
    const deaths = parseInt(data[3].replace(',',''));
    const recoveries = parseInt(data[5].replace(',',''));


    return {
        confirmed,deaths,recoveries
    }

}

const Entry = mongoose.model('Entry');
const LdLevel = mongoose.model('ldLevel');

const AddData=async()=>{
    console.log('Job Started @'+ new Date().toLocaleTimeString());
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


    const {deaths,recoveries,confirmed} = await getData();

    console.log(deaths,confirmed,recoveries);

    const levels = await LdLevel.find();
    const level = parseInt(levels[0].level);

    try{
        const entry = new Entry({
            deaths,
            confirmed,
            recoveries,
            ldLevel:level,
            timestamp:Date.now()-(60*60*4*1000)
        });
        await entry.save();
        console.log(new Date().toLocaleTimeString(),'Entry saved');
    }catch (e) {
        console.log(e);
    }
}

AddData().then(()=>console.log('Job Complete & data captured'));