/**
 * This is client side javacript file which will communicate
 * with server side javascript file 
 */

 console.log('Client side javascript file loaded!')

 fetch('http://localhost:3000/showtimes?hangu pakistan').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data)
        }
    })
 })