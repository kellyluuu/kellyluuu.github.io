const api = '2b131e287e23c9c16111592776823fdb'
const $container = $('container')
const $city = $('#city')
const $feel = $('#feel')
const $weather = $('#weather')
const $temp = $("#temperature")
const $button = $("button")
const $input = $("input")
const $aside = $("aside")
const $length = $("#length")
const $bottomDiv = $("four")
const $ul = $("ul")

function day (x){
    const dateObject = new Date(x*1000)
    return dateObject.toLocaleString("en-US", {weekday: "long"}) 
}
function hr (x){
    const dateObject = new Date(x*1000)
    return dateObject.toLocaleString("en-US", {hour: "numeric"}) 
}

function reset (){
    $container.html(`        <div class="one">
    <h1>AJAX Weather App</h1>
    <input type="text" placeholder="City"/>
    <button>Get Weather</button>
    <form action="format">
        <label for="length">
        <select name="length" id="length" required>
          <option value="now">Current Forcast</option>
          <option value="24hr">24 hours Forcast</option>
          <option value="5d">5 Days Forcast</option>
          <option value="7d">7 Days Forcast</option>
        </label>
        </select><a> RANGE</a>
      </form>
</div>
<div class="two">   
    <p><b>LOCATION:</b><span id="city">  </span></p>
    <p><b>TEMPERATURE:</b><span id="temperature">  </span></p>

</div>
<div class="three">
    <p><b>FEELS-LIKE:</b><span id="feel"></span>  </p>
    <p><b>WEATHER: </b><span id="weather"></span>  </p>  

</div>
<div class="four">
    <aside>
        <ul></ul>
    </aside>
</div>
</div>`)
}

$button.on("click", (event) => {
    event.preventDefault()
    reset()
    const searchTerm = $input.val()
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${api}&units=imperial`)
        .then((data) => {
            const lat = JSON.stringify(data.coord.lat)
            const lon = JSON.stringify(data.coord.lon)
            $city.text(` ${data.name}`)
            $temp.text(` ${data.main.temp} \xB0 F`)
            $feel.text (` ${data.main.feels_like} \xB0 F`)
            const descript = data.weather[0].description
            $weather.text(` ${descript}`)
            $.ajax(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${api}&units=imperial`)
            .then((data2)=>{
                if ($length.val()==='now'){
                    $aside.html(`<h2>${day(data2.daily[0].dt)} : ${data2.current.temp} \xB0 F <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h2><h2>${descript.toUpperCase()}</h2>`)
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
                        $li.html(`<h4>${hr(data2.hourly[i].dt)} Temp: ${data2.hourly[i].temp} \xB0 F 
                        <img src="http://openweathermap.org/img/wn/${data2.hourly[i].weather[0].icon}@2x.png">${data2.hourly[i].weather[0].description}</h4>`)
                        $aside.append($li)
                    }  
                }}
            )
        })
})


