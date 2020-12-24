const request = require('request')
const yargs= require('yargs')
const {prayerTimes}= require('../PrayerTimes')
const express=require('express')
const path = require('path')



const app=express()
console.log(path.join(__dirname,'../public/index.html'))
app.use(express.static(path.join(__dirname,'../public/')))

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

yargs.command({
    command: 'search',
    describe: 'enter city name to search',
    builder : {
        cityname:{
            describe: 'Enter city name to search for it and see prayer times of city',
            demandOption: true,
            type: 'string'
        },


    },  
    handler: function(args){
        prayerTimes(args.cityname)
    }
})
yargs.parse()





/*request({url: url , json:true} , ( error , response ) =>{
    console.log("current date is "+response.body.data[0].date.gregorian.date)
   console.log(response.body.data[0].timings)
})*/