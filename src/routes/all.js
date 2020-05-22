const express = require('express');
const mongoose = require('mongoose');
const axios =require('axios');
const cherrio = require('cheerio');
const schedule = require('node-schedule');

const url ='https://www.worldometers.info/coronavirus/country/south-africa/';


const Entry = mongoose.model('Entry');
const LdLevel = mongoose.model('ldLevel');
const router = express.Router();

router.get('/list',async(req,res)=>{
    const entries = await Entry.find();

    const data = entries.reduce((a,v,i)=>{
        const {confirmed,recoveries,deaths,timestamp,ldLevel}=v;
        a.push({
            confirmed,
            recoveries,
            deaths,
            timestamp,
            lockDownLevel:ldLevel,
            dayNo:i+1
        })
        return a;
    },[])

    res.status(200).send({status:1,data, noOfEntries:entries.length});
});

router.post('/add',async (req,res)=>{

    const {deaths,confirmed,recoveries, ldLevel,date}=req.body;

    try{
        const entry = new Entry({
            deaths,
            confirmed,
            recoveries,
            ldLevel,
            timestamp:date
        });

        await entry.save();

        return  res.status(200).send({status:1,msg:'Data Saved Successfully'});

    }catch(err){
        return  res.status(402).send({status:2,msg:'Error: Unable to add entry'})
    }




});

router.post('/ldlevel',async (req,res)=>{

    const {level}=req.body;

    try{
        const lastLevel = await LdLevel.find();
        const Level = new LdLevel({level});

        if(lastLevel.length===0){
            // no entry, we can save current entry
            await Level.save();
        }else{
            console.log(lastLevel[0]);

            await LdLevel.updateOne({_id:'5eb9580ecbe7b522111df388'},{level});

        }

        res.status(200).send({status:1,msg:'Level updated to: '+level});

    }catch (err) {
        res.status(402).send({status:2,msg:'Error changing level'})
    }




});

router.get('/ldlevel',async (req,res)=>{
    const level = await LdLevel.find();

    res.status(200).send({status:1,level:level[0]});

});


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

router.get('/test',async (req,res)=>{
    const data=await getData();
    return res.status(200).send({status:1,data});
})

schedule.scheduleJob({hour:23,minute: 45},async()=>{
    console.log('job scheduled');
    const {deaths,recoveries,confirmed} = await getData();


    const levels = await LdLevel.find();
    const level = parseInt(levels[0].level);

    try{
        const entry = new Entry({
            deaths,
            confirmed,
            recoveries,
            ldLevel:level,
            timestamp:Date.now()
        });
        await entry.save();
        console.log(new Date().toLocaleTimeString(),'Entry saved');
    }catch (e) {
        console.log(e);
    }




});





module.exports = router;