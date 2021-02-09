/**
 * This is class have following method
 * --> prayerTimes():which take latitude,longtitude and return prayer times.
 * 
 */

const request = require('request')
const chalk = require('../node_modules/chalk')
const express=require('express')
const path=require('path')
const validator= require('validator')

/**
 * This function takes
 * @param {passed by geocode()} latitude 
 * @param {passed by geocode()} longitude
 * and return 
 * @param {return prayertimes} callback 
 */


const prayerTimes=(address,schoolValue,callback)=>{
    

    
    const url3='http://api.aladhan.com/v1/timingsByAddress?address='+address+'&school='+schoolValue+''
    const url2='http://api.aladhan.com/v1/hijriCalendarByAddress?address='+address+''
    //const url ='http://api.aladhan.com/v1/calendar?latitude='+ latitude +'&longitude='+ longitude +'&method='+method+'&school='+school+''
    request({url: url3 , json:true} , ( error , response ) =>{
    
        if(error){
            return {error:error}
        }
        else {
            
            callback(undefined,{
               prayer_times:response.body.data.timings
               
            })

            
        }
        
   })
}

module.exports={
    prayerTimes : prayerTimes
}


