const request = require('request')
//const chalk = require('./node_modules/chalk')
const chalk = require('../node_modules/chalk')
const express=require('express')
const path=require('path')

/**
 * 
 * @param {anycity name} city 
 * Prayer Time nodeJS application that uses MapBox and Aladhan api , 
 * Mapbox for city cordinates and ALadhan for prayer times
 * 
 */





const geocode=(city,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoiaW1raGV6YXIiLCJhIjoiY2tpaHVmejdvMDEzNzJ4bWluMjRybGhoMiJ9.dTYb0OPpWLvxWzyCXSZS2Q'
    request({url:url,json:true},(error, response)=>{
        if(error)
        {
            callback('No internet Connection!',undefined)
        }
        else if(response.body.features.length===0){
            callback("Unable to find Location",undefined)
        }
        else{
            callback(undefined,{
                placename : response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
            })
        }

        
    })

}

const prayerTimes=(latitude,longitude,callback)=>{
    const url ='http://api.aladhan.com/v1/calendar?latitude='+ latitude +'&longitude='+ longitude +'&method=2&school=1'
    request({url: url , json:true} , ( error , response ) =>{
    
       //console.log('Location: '+ chalk.bgGreenBright(place_name))
        console.log(response.body.data[0].timings)
      
        if(error){
            return {error}
        }
        else {
            
            callback(undefined,{
               prayer_times: response.body.data[0].timings
               
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


