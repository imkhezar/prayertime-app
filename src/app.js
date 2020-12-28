const request = require('request')
const yargs= require('yargs')
const {prayerTimes,geocode}= require('../src/PrayerTimes')
const express=require('express')
const path = require('path')
const hbs=require('hbs')



const app=express()

//Define path for express config
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Set up Handlebars and locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
const validator=require('validator')

//Serve index.hbs in templates direcotry
app.get('',(req,res)=>{
    res.render('index',{
        title:"Prayer Time"
    })

})

//This is practice directory where I tried to serve json data on server
app.get('/showTimes',(req,res)=>{

    console.log(req.query.address)


        if(validator.isEmpty(req.query.address) ){
             return res.send({
                error:'Kindly Provide a Valid Address'
            })
        }
       
        geocode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
            if(!req.query.address){
                return res.send({
                    error:error
                })
                
            }
            else{
                prayerTimes(latitude,longitude,(error,{prayer_times}={})=>{
                        if(error){
                            return res.send({
                                error: "No location found"
                            })
                        }
                        else{
                            res.send({
                                place_name,
                                latitude,
                                longitude,
                                prayer_times
                            })
                        }
                })
            }    
    
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
