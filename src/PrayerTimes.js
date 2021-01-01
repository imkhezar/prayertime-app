/**
 * This is class have two function 
 * --> geocode():which take city name and return latitude,longtitude and placenem
 * --> prayerTimes():which take latitude,longtitude and return prayer times.
 * 
 */

const request = require('request')
//const chalk = require('./node_modules/chalk')
const chalk = require('../node_modules/chalk')
const express=require('express')
const path=require('path')
const validator= require('validator')



/**
 * this function takes, using MAPBOX API to retrive latitude,
 * longitude etc.
 * this function takes,
 * @param {cityname} city
 * and return 
 * @param {placename,latitude,longitude} callback 
 */

const geocode=(city,callback)=>{
    if(!city){
       return callback('Kindly provide location',undefined)
    }
    else if(validator.isAlpha(city)){
        return callback('Kindly provide a valid location',undefined)
    }
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(city)+'.json?access_token=pk.eyJ1IjoiaW1raGV6YXIiLCJhIjoiY2tpaHVmejdvMDEzNzJ4bWluMjRybGhoMiJ9.dTYb0OPpWLvxWzyCXSZS2Q'
    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('No internet Connection!',undefined)

        }
        else if(body.features===undefined){
            //console.log('Unable to find location')
            callback('Unable to find Location',undefined)
            
        }
        else{
            callback(undefined,{
                
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name : body.features[0].place_name,
            })
        }

        
    })

}

/**
 * This function takes
 * @param {passed by geocode()} latitude 
 * @param {passed by geocode()} longitude
 * and return 
 * @param {return prayertimes} callback 
 */

const prayerTimes=(latitude,longitude,callback)=>{

    console.log(latitude,longitude)
    
    const url ='http://api.aladhan.com/v1/calendar?latitude='+ latitude +'&longitude='+ longitude +'&method=2&school=1'
    request({url: url , json:true} , ( error , response ) =>{
    
      // console.log('Location: '+ chalk.bgGreenBright(place_name))
        console.log(response.body.data[0].timings)
      
        if(error){
            return {error:error}
        }
        else {
            
            callback(undefined,{
               prayer_times:response.body.data[0].timings
               
            })
            
        }
        
   })
}
/*const prayerTimes = ( city,callback )=>{
    geocode(city,(error,data)=>{
        if(error){
            console.log(chalk.red(error))
        }
        else{
        const latitude= data.latitude//=>data is passed to geocode()
        const longitude=data.longitude//=>data is passed to geocode()
        const place_name=data.placename//=>store place name recived from geocode()

        const url ='http://api.aladhan.com/v1/calendar?latitude='+ latitude +'&longitude='+ longitude +'&method=2&school=1'
        request({url: url , json:true} , ( error , response ) =>{
        
           console.log('Location: '+ chalk.bgGreenBright(place_name))
            console.log(response.body.data[0].timings)
            prayer_times=[response.body.data[0].timings]
            if(error){
                return {error:error}
            }
            else {
                console.log('I ran')
                callback(undefined,{
                    placename:data.placename,
                   prayer_times: response.body.data[0].timings,
                   
                })
                
            }
            
       })
    }
    })
}*/





module.exports={
    geocode : geocode,
    prayerTimes : prayerTimes
}


