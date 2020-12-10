const request = require('request')
const yargs= require('yargs')
const {citySearch}= require('./CitySearch')


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
        citySearch(args.cityname)
    }
})
yargs.parse()





/*request({url: url , json:true} , ( error , response ) =>{
    console.log("current date is "+response.body.data[0].date.gregorian.date)
   console.log(response.body.data[0].timings)
})*/