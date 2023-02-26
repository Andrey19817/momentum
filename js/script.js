import playListMusic from '../assets/sounds/sounds.js'
import langArr from '.././js/lang.js'



let time = document.querySelector('.time')
let datemain = document.querySelector('.date')

let greetingcontainer = document.querySelector('.greeting-container')
let greeting = document.querySelector('.greeting')
let name = document.querySelector('.name')

let body = document.body


let slidernext = document.querySelector('.slide-next')
let sliderprew = document.querySelector('.slide-prev')

let numForslider = 0 //счетчик для слайдера
// ------------------------------------------------------------ функции получения картинки
function getImgMorning(){
  const img = new Image()
  img.src = `https://andrey19817.github.io/stage1-tasks/images/morning/${numForslider}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  }
}
function getImgAfternoon(){
  const img = new Image()
  img.src = `https://andrey19817.github.io/stage1-tasks/images/afternoon/${numForslider}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  }
}
function getImgEvening(){
  const img = new Image()
  img.src = `https://andrey19817.github.io/stage1-tasks/images/evening/${numForslider}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  }
}
function getImgNight(){
  const img = new Image()
  img.src = `https://andrey19817.github.io/stage1-tasks/images/night/${numForslider}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  }
}
// ------------------------------------------------------------------
slidernext.addEventListener('click',()=>{
  numForslider++ 
  numForslider < 10 ? numForslider = '0' + numForslider:numForslider
  numForslider > 20 ? numForslider = '0' + 1:numForslider
  date.getHours() >= 6 &&  date.getHours() < 12 ? getImgMorning():
    date.getHours() >= 12 && date.getHours() < 18 ? getImgAfternoon():
    date.getHours() >= 18 ? getImgEvening(): getImgNight()
})

sliderprew.addEventListener('click',()=>{
  numForslider === 0 ? numForslider = 1 : numForslider
  numForslider-- 
  numForslider < 10 ? numForslider = '0' + numForslider : numForslider
  numForslider === '00' ? numForslider = 20 : numForslider
  date.getHours() >= 6 &&  date.getHours() < 12 ?  getImgMorning():
    date.getHours() >= 12 && date.getHours() < 18 ?  getImgAfternoon():
    date.getHours() >= 18 ?  getImgEvening():  getImgNight()
})
// -------------------------------------------------------------

// ----------------------------------------------------------------
let date = new Date
datemain.textContent = `${langArr['week'][document.querySelector('.change-lang').value][date.getDay()]}, ${langArr['month'][[document.querySelector('.change-lang').value]][date.getMonth()]} ${date.getDate()}`
// ------------------------------------------------------------
let city = document.querySelector('.city')
city.value = window.localStorage.getItem('Пример')
name.value = window.localStorage.getItem('name')

let pogoda = new String(city.value) // перем для хранения значения city.value

// ----------------------------------------------------
name.oninput = () =>{
  window.localStorage.setItem('name', `${name.value}`)
}
city.oninput = ()=>{
  window.localStorage.setItem('Пример', `${city.value}`)
}
// --------------------------------------------------------
let selectChange= document.querySelector('.change-lang').value
function addTime(){
    let date = new Date
    time.textContent = date.toLocaleTimeString()
    city.placeholder = langArr['placeholderCity'][[document.querySelector('.change-lang').value]];
    name.placeholder = langArr['placeholderName'][[document.querySelector('.change-lang').value]];
    if(datemain.textContent !== `${langArr['week'][document.querySelector('.change-lang').value][date.getDay()]}, ${langArr['month'][[document.querySelector('.change-lang').value]][date.getMonth()]} ${date.getDate()}`){
        datemain.textContent = `${langArr['week'][document.querySelector('.change-lang').value][date.getDay()]}, ${langArr['month'][[document.querySelector('.change-lang').value]][date.getMonth()]} ${date.getDate()}`
    }
    
    date.getHours() >= 6 &&  date.getHours() < 12 ? greeting.textContent = greeting.textContent = langArr['greeting'][document.querySelector('.change-lang').value+'-1']:
    date.getHours() >= 12 && date.getHours() < 18 ? greeting.textContent = langArr['greeting'][document.querySelector('.change-lang').value+'-2']:
    date.getHours() >= 18 ? greeting.textContent = greeting.textContent = langArr['greeting'][document.querySelector('.change-lang').value+'-3']: greeting.textContent = greeting.textContent = langArr['greeting'][document.querySelector('.change-lang').value+'-4']
  if(String(city.value) !== String(pogoda)){//погода другого города
    getWeather()
    pogoda = city.value 
  }
  if(selectChange !== document.querySelector('.change-lang').value){
    getWeather()
    getchangeQuote()
    chengeSetings()
    selectChange= document.querySelector('.change-lang').value
  }
  }
  // ----------------------------------------------------получить рандомное число
  let num = ()=>{
    let result = Math.floor(Math.random() * (20 - 1)) + 1
    return result < 10 ? '0' + result : result
  }
// ---------------------------------------------------------
  function addBacground(){
    date.getHours() >= 6 &&  date.getHours() < 12 ? body.style.backgroundImage = `url("https://andrey19817.github.io/stage1-tasks/images/morning/${num()}.jpg")`:
    date.getHours() >= 12 && date.getHours() < 18 ? body.style.backgroundImage = `url("https://andrey19817.github.io/stage1-tasks/images/afternoon/${num()}.jpg")`:
    date.getHours() >= 18 ? body.style.backgroundImage = `url("https://andrey19817.github.io/stage1-tasks/images/evening/${num()}.jpg")`: body.style.backgroundImage = `url("https://andrey19817.github.io/stage1-tasks/images/night/${num()}.jpg")`
  }

// ------------------------------------- погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind')
const weatherHumidity = document.querySelector('.humidity')
const weatherError = document.querySelector('.weather-error')

let icon     //переменная для убирания иконки погоды

  async function getWeather() { 
    try{
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${document.querySelector('.change-lang').value}&appid=d4c9aefb013f4b737f2f7640109d0492&units=metric`;
      const res = await fetch(url);
      const data = await res.json();  
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent = `${langArr['wind'][document.querySelector('.change-lang').value]}: ${Math.round(data.wind.speed)} m/s`
    weatherHumidity.textContent = `${langArr['humidity'][document.querySelector('.change-lang').value]}: ${Math.round(data.main.humidity)}%`
    weatherError.textContent = ''
     icon = new String(`owf-${data.weather[0].id}`)
    }catch(e){
      weatherError.textContent = langArr['wether-error'][document.querySelector('.change-lang').value]
      temperature.textContent = ``;
    weatherDescription.textContent = '';
    weatherWind.textContent = ``
    weatherHumidity.textContent = ``
    weatherIcon.classList.remove(`${icon}`);
    } 
    
 
  }
  // ------------------------------------- цитаты
  const quote = document.querySelector('.quote')
  const author = document.querySelector('.author')
  const btnChangeQuote = document.querySelector('.change-quote')

  btnChangeQuote.addEventListener('click',getchangeQuote)
  function getchangeQuote(){
      let url = langArr['url'][document.querySelector('.change-lang').value]
    const res = fetch(url)
      .then(response => response.json())
      .then(response => {
        let result = Math.floor(Math.random() * (response.length - 1)) + 1
        quote.textContent = `"${response[result].text}"`
        author.textContent = `${response[result].author}`
      })
  }
  // ------------------------------------ audio
let isPlay = false
const audio = new Audio()
let play = document.querySelector('.play')
let playlist = document.querySelector('.play-list')
let playNext = document.querySelector('.play-next')
let playPrev = document.querySelector('.play-prev')

// -------------------------------------------------
let counterPlayList = 0

function playAudio(){
audio.src = playListMusic[counterPlayList].src
}

function nextPlay(){
  counterPlayList++
  counterPlayList === playListMusic.length  ? counterPlayList = 0 : counterPlayList
  isPlay = false
  goingMusic()     
}
function prewPlay(){
  counterPlayList--
  counterPlayList < 0 ? counterPlayList = playListMusic.length-1 : counterPlayList
  isPlay = false
  goingMusic()
}
// -----------------------------------------------

playNext.addEventListener('click',nextPlay)
playPrev.addEventListener('click',prewPlay)


function goingMusic(){
  let arr = new Array(...playlist.children)
  let res = arr.find(elem => elem.innerText === playListMusic[counterPlayList].title)
      playAudio()
    if(!isPlay){
      audio.play()
      play.classList.add('pause')
      isPlay = true
      res.classList.add('item-active')
      audio.onended = () => nextPlay()//------------------неприрывное воспроизведение playlist
    }else{
      audio.pause()
      play.classList.remove('pause')
      res.classList.remove('item-active')
      isPlay = false
  }
  arr.map(elem => {
if(elem.innerText !== playListMusic[counterPlayList].title){
  elem.classList.remove('item-active')
}
  })
}

play.addEventListener('click',goingMusic)

function showPlayList(){//----------------------------отображение playlist
  for(let i = 0;i < playListMusic.length;i++){
    let item = document.createElement('li')
    item.classList.add('play-item')
    item.textContent = playListMusic[i].title
    playlist.append(item)
    item.addEventListener('click',(e)=>{
      counterPlayList = [...playlist.children].indexOf(item)
      isPlay = false
      goingMusic()
      
    })
    
  }
}
// --------------------------------------------- перевод

let settingsIcons = document.querySelector('.settings-icons')
let settings = document.querySelector('.settings')
let onOffWether = document.querySelector('.on-off-wether')
let onOffMedia = document.querySelector('.on-off-media')
let onOffCitats = document.querySelector('.on-off-citats')
let onOffTime = document.querySelector('.on-off-time')
let btnOff = document.querySelector('.btn-off')

let onoffwetherText = document.querySelector('.on-off-wetherText')
let onoffwetherMedia = document.querySelector('.on-off-wetherMedia')
let onoffwetherCitats = document.querySelector('.on-off-wetherCitats')
let onoffwetherTime = document.querySelector('.on-off-wetherTime')
let color = document.querySelector('.color')

function chengeSetings(){
  onoffwetherText.textContent = langArr['onOffWether'][document.querySelector('.change-lang').value]
  onoffwetherCitats.textContent = langArr['onOffCitats'][document.querySelector('.change-lang').value]
  onoffwetherMedia.textContent = langArr['onOffMedia'][document.querySelector('.change-lang').value]
  onoffwetherTime.textContent = langArr['onOffTime'][document.querySelector('.change-lang').value]
}
// --------------------------------- отключение погоды,плеера,цитат

function wetherOff(e){
  document.querySelector('.weather').classList.toggle('weather-active')
  if(e.target.className === 'on-off-wetherText'){
    e.target.nextElementSibling.classList.toggle('red')
  }
  if(e.target.className === 'on-off-wether'){
    e.target.children[1].classList.toggle('red')
  }
  if(e.target.className === 'color'|| e.target.className === 'color red'){
    e.target.classList.toggle('red')
  }

}
// --------------------------------------------------

function mediaOff(e){
  document.querySelector('.player').classList.toggle('weather-active')
  if(e.target.className === 'on-off-wetherMedia'){
    e.target.nextElementSibling.classList.toggle('red')
  }
  if(e.target.className === 'on-off-media'){
    e.target.children[1].classList.toggle('red')
  }if(e.target.className === 'color'|| e.target.className === 'color red'){
    e.target.classList.toggle('red')
  }
}
// ------------------------------------------------------

function citatsOff(e){
  document.querySelector('.footer-citats').classList.toggle('weather-active')
  btnChangeQuote.classList.toggle('weather-active')
  if(e.target.className === 'on-off-wetherCitats'){
    e.target.nextElementSibling.classList.toggle('red')
  }
  if(e.target.className === 'on-off-citats'){
    e.target.children[1].classList.toggle('red')
  }if(e.target.className === 'color'|| e.target.className === 'color red'){
    e.target.classList.toggle('red')
  }
}
// -------------------------------------------
function timeOff(e){
  document.querySelector('.time').classList.toggle('weather-active')
  document.querySelector('.date').classList.toggle('weather-active')
  document.querySelector('.greeting-container').classList.toggle('weather-active')
  if(e.target.className === 'on-off-wetherTime'){
    e.target.nextElementSibling.classList.toggle('red')
  }
  if(e.target.className === 'on-off-time'){
    e.target.children[1].classList.toggle('red')
  }if(e.target.className === 'color'|| e.target.className === 'color red'){
    e.target.classList.toggle('red')
  }
}
// --------------------------------------------------


settingsIcons.addEventListener('click',()=>{
  settings.classList.toggle('settings-active')
  let arr = new Array(...settings.children)
  setTimeout(()=>{
    arr.forEach(elem => elem.classList.toggle('active'))
  },600)
  settingsIcons.classList.toggle('active')
})

btnOff.addEventListener('click',()=>{
  settings.classList.toggle('settings-active')
  let arr = new Array(...settings.children)
  arr.forEach(elem => elem.classList.toggle('active'))
  settingsIcons.classList.toggle('active')
})

// -----------------------------------------------

onOffWether.addEventListener('click',(e)=>{wetherOff(e)})
onOffMedia.addEventListener('click',(e)=>{mediaOff(e)})
onOffCitats.addEventListener('click',(e)=>{citatsOff(e)})
onOffTime.addEventListener('click',(e)=>{timeOff(e)})
  
  getWeather()
  getchangeQuote()
  showPlayList()
  chengeSetings()

addBacground()
  setInterval(addTime,1000)
