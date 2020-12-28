/**
 * This is client side javacript file which will communicate
 * with server side javascript file 
 */

 console.log('Client side javascript file loaded!')

 /*fetch('http://localhost:3000/showtimes?address=hangu pakistan').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data)
        }
    })
 })*/
 console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')



weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

   /* fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })*/
})

 