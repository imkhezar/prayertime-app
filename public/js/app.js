
var weatherForm = document.getElementById('abc')
//console.log(weatherForm)
var search = document.getElementById('def')
//search button pressed
var onSearchButton=document.getElementById('searchButton')


//fajar
var fajar=document.getElementById('fajar')
var fajar_end=document.getElementById('fajar_end')
//zuhar
var zuharDOM=document.getElementById('zuhar')
var zuhar_end= document.getElementById('zuhar_end')

//Asar
var asrDOM=document.getElementById('asr')
var asr_end=document.getElementById('asr_end')

//Maghrib
var maghribDOM=document.getElementById('maghrib')
var maghrib_end=document.getElementById('maghrib_end')

//isha
var ishaDOM=document.getElementById('isha')
var isha_end=document.getElementById('isha_end')

console.log(fajar)
//console.log(search)




weatherForm.addEventListener("click", (e) => {
    
    //e.preventDefault()
    search.textContent=""

    const location = search.value
    console.log(location)

    fetch('/showtimes?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
               const fajr=data.prayer_times.Fajr
               const fajrSub=fajr.substring(0,5)//=> which return only time from json normal(12:44 EST) after substring (12:44)
               const  sunrise=data.prayer_times.Sunrise
                //zuhar
               const zuhar=data.prayer_times.Dhuhr
               const zuharSub=zuhar.substring(0,5)
                //asar
               const asr=data.prayer_times.Asr
               const asrSub=asr.substring(0,5)
               const sunset=data.prayer_times.Sunset
               //maghrib
               const maghrib=data.prayer_times.Maghrib
               const maghribSub=maghrib.substring(0,5)

               //isha
               const isha=data.prayer_times.Isha
               const ishaSub=isha.substring(0,5)

            //---------------Setting prayers times to DOM
                //fajar
                fajar.textContent=fajrSub
                fajar_end.textContent=sunrise

                //Zuhar
                zuharDOM.textContent=zuharSub
                zuhar_end.textContent=asr

                //setting asr
                asrDOM.textContent=asrSub
                asr_end.textContent=maghrib

                //maghrib
                maghribDOM.textContent=maghribSub
                maghrib_end.textContent=isha

                //isha
                ishaDOM.textContent=ishaSub
                isha_end.textContent=fajr

                //locations set
                
                document.getElementById('def').setAttribute('placeholder','test value')


                
                
            }
        })
    })
})

 