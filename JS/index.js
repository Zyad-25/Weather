async function search(city) {
    let httpWth = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cbf78c2811ac4b6d94995152240210&q=${city}&days=3`);
    if (httpWth.ok && httpWth.status == 200) {
        let res = await httpWth.json();
        console.log(httpWth);
        console.log(res);
        display(res)
    }


}
const find = document.getElementById('find');
find.addEventListener('keyup', () => {
    search(find.value);
});
let days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function display(res) {
    let d = new Date(res.forecast.forecastday[0].date);
    let x = d.toString();
    let arr = x.split(' ');
    let temp = [];
    let day2 = '';
    let day3 = '';
    console.log(arr);
    for (let i = 0; i < months.length; i++) {
        if(months[i].includes(arr[1])){
            temp.push(months[i]);
            break;
        }
    }
    for (let i = 0; i < days.length; i++) {
        if(days[i].includes(arr[0])){
            temp.push(days[i]);
            if(i == 6){
                day2 = days[0];
                day3 = days[1];
            }else if(i == 5){
                day2 = days[6];
                day3 = days[0];
            }else{
                day2 = days[i+1];
                day3 = days[i+2];
            }
            break;
        }
    }
   console.log(temp[0]);
   console.log(temp[1]);
   
    let cartona = `<div class="col-lg-4">
          <div class="head d-flex justify-content-between align-items-center ">
            <p class="p-2 pb-0">${temp[1]}</p>
            <p class="p-2 pb-0">${Number(arr[2])} ${temp[0]}</p>
          </div>
          <div class="wth-body">
            <div class="city">
              ${res.location.name}
            </div>
            <div class="degree">
              <h1>
                ${res.current.temp_c}<sup>o</sup>C
              </h1>
            </div>
            <div class="state">
              <img src="${res.current.condition.icon}" alt="">
            </div>
            <div class="main-color text">
              ${res.current.condition.text}
            </div>
            <span class="me-2"><i class="fa-solid fa-umbrella"></i> 20%</span>
            <span class="me-2"><i class="fa-solid fa-wind"></i> 18km/h</span>
            <span class="me-2"><i class="fa-regular fa-compass"></i> East</span>
          </div>
        </div>
        <div class="col-lg-4 vip">
          <div class="head2 d-flex justify-content-center">
            <p class="p-2 pb-0">${day2}</p>
          </div>
          <div class="wth-body2 text-center">
            <div class="icon-state ">
              <img src="${res.forecast.forecastday[1].day.condition.icon}" alt="">
            </div>
            <div class="degree2">
              ${res.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C
            </div>
            <div class="degree2-small">
              ${res.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>
            </div>
            <div class="info-wth">
            ${res.forecast.forecastday[1].day.condition.text}
            </div>
          </div>
        </div>
        <div class="col-lg-4 vip2">
          <div class="head3 d-flex justify-content-center">
            <p class="p-2 pb-0">${day3}</p>
          </div>
          <div class="wth-body2 text-center">
            <div class="icon-state">
              <img src="${res.forecast.forecastday[2].day.condition.icon}" alt="">
            </div>
            <div class="degree2">
              ${res.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C
            </div>
            <div class="degree2-small">
              ${res.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>
            </div>
            <div class="info-wth">
            ${res.forecast.forecastday[2].day.condition.text}
            </div>
          </div>
        </div>`;
    document.getElementById('demo').innerHTML = cartona;
}

function gLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  }
}

async function showPosition(position){
  let response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
  let loc = await response.json();
  let city = loc.city;
  console.log(`${city}`);
  search(city);
}
gLocation();