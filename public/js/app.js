
var weatherForm = document.getElementById('abc')
//console.log(weatherForm)
var search = document.getElementById('def')
//console.log(search)



weatherForm.addEventListener("submit", (e) => {
    
    e.preventDefault()

    const location = search.value
    console.log(location)

    fetch('http://localhost:3000/showtimes?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                
            }
        })
    })
})

 