const api = '2b131e287e23c9c16111592776823fdb'
const $container = $("#container")
const $city = $('#city')
const $feel = $('#feel')
const $weather = $('#weather')
const $temp = $("#temperature")
const $button = $("#search-button")
const $input = $("input")
const $aside = $("aside")
const $length = $("#length")
const $one =$(".one")
const $five= $(".five")
const $ul = $("ul")

function day (x){
    const dateObject = new Date(x*1000)
    return dateObject.toLocaleString("en-US", {weekday: "long"}) 
}
function hr (x){
    const dateObject = new Date(x*1000)
    return dateObject.toLocaleString("en-US", {hour: "numeric"}) 
}
$five.hide()

$button.on("click", (event) => {
    event.preventDefault()
    const searchTerm = $input.val();
    $one.hide()
    $five.show()
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${api}&units=imperial`)
        .then((data) => {
            const lat = JSON.stringify(data.coord.lat)
            const lon = JSON.stringify(data.coord.lon)
            $city.text(` ${data.name}`)
            $temp.text(` ${data.main.temp} \xB0 F`)
            $feel.text (` ${data.main.feels_like} \xB0 F`)
            const descript = data.weather[0].description
            $weather.text(` ${descript}`)
            $five.text(`${data.name.toUpperCase()}`)
            $.ajax(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${api}&units=imperial`)
            .then((data2)=>{
                if ($length.val()==='now'){
                    $aside.html(`<h4>${day(data2.daily[0].dt)} : ${data2.current.temp} \xB0 F <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h4><h4>${descript.toUpperCase()}</h>`)
                }else if ($length.val()==='5d'){   
                    for (let i=0; i<5; i++){
                        const $li = $("<li>")
                        $li.html(`<h4>${day(data2.daily[i].dt)} Temp: ${data2.daily[i].temp.day} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png">${data2.daily[i].weather[0].description}</h4>`)
                        $aside.append($li)
                    }     
                }else if ($length.val()==='7d'){
                    for (let i=0; i<7; i++){
                        const $li = $("<li>")
                        $li.html(`<h4>${day(data2.daily[i].dt)} Temp: ${data2.daily[i].temp.day} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png">${data2.daily[i].weather[0].description}</h4>`)
                        $aside.append($li)
                    }  
                }else if ($length.val()==='24hr'){
                    for (let i=0; i<24; i++){
                        const $li = $("<li>")
                        $li.html(`<p>${hr(data2.hourly[i].dt)} Temp: ${data2.hourly[i].temp} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.hourly[i].weather[0].icon}@2x.png" inline-size="10%">${data2.hourly[i].weather[0].description}</p>`)
                        $aside.append($li)
                    }  
                }}
            )
        })
})


