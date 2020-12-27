const request = require('request')
const yargs= require('yargs')
const {prayerTimes,geocode}= require('../src/PrayerTimes')
const express=require('express')
const path = require('path')



const app=express()

//Set up Handlebars to serve hbs file in views direcotry
app.set('view engine','hbs')

//Setup a directory to serve static assets
app.use(express.static(path.join(__dirname,'../public')))

//Serve index.hbs in views direcotry
app.get('',(req,res)=>{
    res.render('index',{
        title:"Prayer Time"
    })

})

//This is practice directory where I tried to serve json data on server
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

//Server Setup on port 3000,

app.listen(3000,()=>{
console.log('server is up on port 3000')
})


//These are commonds "Search" it was made when I trying backend
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
