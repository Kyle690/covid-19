const express = require('express');
const mongoose = require('mongoose');

const entries = mongoose.model('Entry');
const router = express.Router();

// daily
router.get('/daily',async (req,res)=>{

    const Entries = await entries.find();

    let previousConfirmed=0;
    let previousDeaths=0;
    let previousRecovery =0;
    let previousActive=0;

    const data = Entries.reduce((a,v,i)=>{

        const {confirmed,recoveries,deaths,timestamp, ldLevel}=v;

        a.push({
            dayNo:i+1,
            timestamp,
            confirmed,
            difference: confirmed-previousConfirmed,
            deaths,
            dailyDeaths:deaths-previousDeaths,
            recoveries,
            dailyRecoveries:recoveries-previousRecovery,
            active: confirmed-(deaths+recoveries),
            dailyActive:(confirmed-(deaths+recoveries)-previousActive),
            lockDownLevel:ldLevel
        });

        previousConfirmed=confirmed;
        previousActive=confirmed-(deaths+recoveries);
        previousRecovery=recoveries;
        previousDeaths=deaths;

        return a;
    },[]);

    return res.status(200).send({status:1,data})

});
// daily deaths
router.get('/daily/deaths',async(req,res)=>{
   const Entries = await entries.find();
   let previousDeaths=0;
   const data = Entries.reduce((a,v,i)=>{

       const {deaths,timestamp,ldLevel}=v;
       a.push({
           dayNo:i+1,
           lockDownLevel:ldLevel,
           deaths,
           dailyDeaths:deaths-previousDeaths,
           timestamp
       });
       previousDeaths=deaths;
      return a;
   },[]);

   return res.status(200).send({status:1,data});

});
// daily confirmed
router.get('/daily/confirmed', async (req,res)=>{
    const Entries = await entries.find();
    let previousConfirmed = 0;
    const data = Entries.reduce((a,v,i)=>{
        const {confirmed, timestamp, ldLevel}=v;
        a.push({
            lockDownLevel:ldLevel,
            dayNo:i+1,
            confirmed,
            difference:confirmed-previousConfirmed,
            timestamp
        });
        previousConfirmed=confirmed;
        return a;
    },[]);
    res.status(200).send({status:1,data});
});
// daily recoveries
router.get('/daily/recoveries',async (req,res)=>{
    const Entries = await entries.find();
    let previousRecover=0;
    const data = Entries.reduce((a,v,i)=>{
        const {recoveries,timestamp, ldLevel}=v;
        a.push({
           lockDownLevel:ldLevel,
           dayNo:i+1,
           recoveries,
           difference:recoveries-previousRecover,
           timestamp
        });
        previousRecover=recoveries;
       return a;
    },[]);

    return res.status(200).send({status:1,data})

});
// daily details
router.get('/daily/day',async(req,res)=>{
    const Entries = await entries.find();
    let previousConfirmed=0;
    let previousDeaths=0;
    let previousRecoveries=0;

    const data =Entries.reduce((a,v,i)=>{
        const {confirmed,recoveries,deaths,timestamp, ldLevel}=v;

        a.push({
            lockDownLevel:ldLevel,
            dayNo:i+1,
            confirmed:confirmed-previousConfirmed,
            recoveries:recoveries-previousRecoveries,
            deaths:deaths-previousDeaths,
            timestamp
        });
        previousConfirmed=confirmed;
        previousRecoveries=recoveries;
        previousDeaths=deaths;

        return a;
    },[]);

    res.status(200).send({status:1,data});

})



module.exports = router;