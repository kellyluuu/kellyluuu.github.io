const api = '2b131e287e23c9c16111592776823fdb'
const $wind = $('#wind')
const $humidity = $('#humidity')
const $weather = $('#weather')
const $temp = $("#temperature")
const $button = $("#search-button")
const $input = $("input")
const $aside = $("aside")
const $length = $("#length")
const $one =$(".one")
const $title =$("#title")
const $five= $(".five")

function day (x){
    const dateObject = new Date(x*1000)
    return dateObject.toLocaleString("en-US", {weekday: "long"}) 
}
function hr (x){
    const dateObject = new Date(x*1000)
    return dateObject.toLocaleString("en-US", {hour: "numeric"}) 
}

$input.on("keyup",(event) =>{
  if (event.keyCode === 13) {
   event.preventDefault();
   $button.click();
  }
});

$button.on("click", (event) => {
    event.preventDefault()
    const searchTerm = $input.val(); 
    $one.hide()
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${api}&units=imperial`)
        .then((data) => {
            const lat = JSON.stringify(data.coord.lat)
            const lon = JSON.stringify(data.coord.lon)
            $temp.text(` ${data.main.temp} \xB0 F`)
            $wind.text(` ${data.main.humidity} mph`)
            $humidity.text (` ${data.main.humidity} %`)
            const descript = data.weather[0].description
            $weather.text(` ${descript}`)
            $five.html(`&nbsp;&nbsp;${data.name.toUpperCase()} &nbsp; <button onClick="window.location.href=window.location.href">New Search</button>`)
            $.ajax(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${api}&units=imperial`)
            .then((data2)=>{
                if ($length.val()==='now'){
                    $aside.html(`<h3>${day(data2.daily[0].dt).toUpperCase()} : ${data2.current.temp} \xB0 F </h3> 
                    <h3>${descript.toUpperCase()}</h3>
                    <h3><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style="width:170px;height:170px;"></h3>`)
                }else if ($length.val()==='5d'){  
                    $title.text(`5 Day Forcast`) 
                    for (let i=0; i<5; i++){
                        const $li = $("<li>")
                        $li.html(`${day(data2.daily[i].dt)} Temp: ${data2.daily[i].temp.day} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png"style="width:90px;height:90px;">${data2.daily[i].weather[0].description}`)
                        $aside.append($li)
                    }
                }else if ($length.val()==='3d'){  
                    $title.text(`3 Day Forcast`) 
                    for (let i=0; i<3; i++){
                        const $li = $("<li>")
                        $li.html(`${day(data2.daily[i].dt)} Temp: ${data2.daily[i].temp.day} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png"style="width:90px;height:90px;">${data2.daily[i].weather[0].description}`)
                        $aside.append($li)
                    }  
                }else if ($length.val()==='7d'){
                    $title.text(`7 Day Forcast`) 
                    for (let i=0; i<7; i++){
                        const $li = $("<li>")
                        $li.html(`${day(data2.daily[i].dt)} Temp: ${data2.daily[i].temp.day} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png" style="width:75px;height:75px;" >${data2.daily[i].weather[0].description}`)
                        $aside.append($li)
                    }  
                }else if ($length.val()==='12hr'){
                    $title.text(`12 Hour Forcast`) 
                    for (let i=0; i<12; i++){
                        const $li = $("<li>")
                        $li.html(`${hr(data2.hourly[i].dt)} Temp: ${data2.hourly[i].temp} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.hourly[i].weather[0].icon}@2x.png" style="width:50px;height:50px;">${data2.hourly[i].weather[0].description}`)
                        $aside.append($li)
                    }  
                }else if ($length.val()==='24hr'){
                    $title.text(`24 Hour Forcast`) 
                    for (let i=0; i<24; i++){
                        const $li = $("<li>")
                        $li.html(`${hr(data2.hourly[i].dt)} Temp: ${data2.hourly[i].temp} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.hourly[i].weather[0].icon}@2x.png" width="50px" height="50px">${data2.hourly[i].weather[0].description}`)
                        $aside.append($li)
                    }  
                }}
            )
        }).catch(()=>{
            $five.html(`&nbsp;&nbsp; Invalid City or Zip &nbsp; <button onClick="window.location.href=window.location.href">New Search</button>`)
        })
})


