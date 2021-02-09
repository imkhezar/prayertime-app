const request = require('request')
const yargs= require('yargs')
const {prayerTimes}= require('../src/PrayerTimes')
const express=require('express')
const path = require('path')
const hbs=require('hbs')



const app=express()
const port=process.env.PORT || 3000

//Handel redirect



//Define path for express config
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath =path.join(__dirname,'../templates/views')
//const imagesPath=path.join(__dirname,'../public/assets/images')

const partialsPath=path.join(__dirname,'../templates/partials')

//redirect


//Set up Handlebars and locations
app.set('view engine','hbs')
//app.use(express.static(imagesPath)); 
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)
const validator=require('validator')
const { METHODS } = require('http')

//Serve index.hbs in templates direcotry
app.get('',(req,res)=>{
    res.render('index',{
        title:"Prayer Time"
    })

})
app.get('/comingsoon',(req,res)=>{
    res.render('comingsoon')
})

//This is practice directory where I tried to serve json data on server
app.get('/showTimes/',(req,res)=>{

    console.log(req.query.address,req.query.method,req.query.method,req.query.school)


        if(validator.isEmpty(req.query.address) ){
             return res.send({
                error:'Kindly Provide a Valid Address'
            })
        }
             else{
                //es(latitude,longitude,req.query.method,req.query.school,(error,{prayer_times}={})=>{
                prayerTimes(req.query.address,req.query.school,(error,{prayer_times}={})=>{
                    console.log('here in src js'+req.query.school)
                        if(error){
                            return res.send({
                                error: "No location found"
                            })
                        }
                        else{
                            res.send({
                                prayer_times
                            })
                        }
                })
                
            }    
    
        })
   
//Server Setup on port 3000,

app.listen(port,()=>{
console.log('server is up on port'+port)
})

