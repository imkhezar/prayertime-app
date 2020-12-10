const request = require('request')
const chalk = require('chalk')

/**
 * 
 * @param {anycity name} city 
 * Prayer Time nodeJS application that uses MapBox and Aladhan api , 
 * Mapbox for city cordinates and ALadhan for prayer times
 * 
 */


const citySearch= (city) => {

    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token=pk.eyJ1IjoiaW1raGV6YXIiLCJhIjoiY2tpaHVmejdvMDEzNzJ4bWluMjRybGhoMiJ9.dTYb0OPpWLvxWzyCXSZS2Q'

    //const url ='http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+long+'&method=2&school=1'


    request({url: url2 , json:true} , ( error , response ) =>{
        console.log(chalk.white.inverse(response.body.features[0].place_name))
        const long=response.body.features[0].center[0]
        const lat=response.body.features[0].center[1]
        const url ='http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+long+'&method=2&school=1'

         request({url: url , json:true} , ( error , response ) =>{
             const url ='http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+long+'&method=2&school=1'
            
             console.log(response.body.data[0].timings)
})

})
}

module.exports={
    citySearch : citySearch
}


