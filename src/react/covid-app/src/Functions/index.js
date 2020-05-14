export const FormatDate=(date)=>{
    const d = new Date(date);
    const day=d.getDate();
    const month=d.getMonth()+1;
    const year = d.getFullYear();
    const time=d.getHours()+':'+('0'+d.getMinutes()).slice(-2);

    return day+'/'+month+'/'+year;
};

export const DataArr=(data)=>{
   return data.reduce((a,v)=>{
            const {dayNo, timestamp,confirmed,difference,deaths,dailyDeaths,recoveries,dailyRecoveries,active,dailyActive,lockDownLevel}=v;
            a.date.push(FormatDate(timestamp));
            a.days.push(dayNo);
            a.confirmed.push(confirmed);
            a.difference.push(difference);
            a.deaths.push(deaths);
            a.dailyDeaths.push(dailyDeaths);
            a.recoveries.push(recoveries);
            a.dailyRecoveries.push(dailyRecoveries);
            a.active.push(active);
            a.dailyActive.push(dailyActive);
            a.lockdownLevel.push(lockDownLevel);

            return a;
        },
        {
            days:[],
            date:[],
            confirmed:[],
            difference:[],
            deaths:[],
            dailyDeaths:[],
            recoveries:[],
            dailyRecoveries:[],
            active:[],
            dailyActive:[],
            lockdownLevel:[]
        });
}