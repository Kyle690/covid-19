const express = require('express');
const mongoose = require('mongoose');

const entries = mongoose.model('Entry');
const router = express.Router();

router.get('/latest',async (req,res)=>{
        const allEntries = await entries.find();
        const dayNo = allEntries.length;
        const {deaths,confirmed,recoveries,ldLevel} = allEntries[dayNo-1];
        const active = confirmed-(deaths+recoveries);

        const data ={
                active,
                deaths,
                confirmed,
                recoveries,
                ldLevel,
                dayNo,
                date:new Date().toISOString()
        }


        res.status(200).send({status:1,data});

});




module.exports = router;