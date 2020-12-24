const request = require('request')
const yargs= require('yargs')
const {prayerTimes,geocode}= require('../src/PrayerTimes')
const express=require('express')
const path = require('path')



const app=express()
console.log(path.join(__dirname,'../public/index.html'))
app.use(express.static(path.join(__dirname,'../public/')))

/*app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})*/

app.get('/showTimes',(req,res)=>{

    
        geocode(req.query.address,(error,{placename,latitude,longitude})=>{
            if(!req.query.address){
                return res.send({error})
            }
            else{
                prayerTimes(latitude,longitude,(error,prayerstimesdata)=>{
                        if(error){
                            return res.send({error})
                        }
                        else{
                            res.send({
                                placename:placename,
                                latitude:latitude,
                                longitude:longitude,
                                prayertimes:prayerstimesdata
                            })
                        }
                })
            }    
            /*res.send({
                    placename:placename,
                    latitude:latitude,
                    longitude:longitude
                })*/
        })
    })

    /*if(!req.query.address){
       return res.send({
            error:"No address added"
        })
    }
    else{
        prayerTimes(req.query.address,({placename,prayer_times})=>{
           return res.send({
                trysearch:"flkdjlkfjls",
                locationSearched: placename,
                prayertimes: prayer_times
            })
        })
        
        /*geocode(req.query.address , (error,{latitude,longitude,location})=>{

        })*/
    //}
//})
app.listen(3000,()=>{
console.log('server is up on port 3000')
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