let playercardContainer = document.getElementById('insert')
playercardContainer.innerHTML = ''
let temp = []
let final = []
let ranks = ['Guild Leader', 'Lead Officer', 'Officer', "Treasurer", "Raider", "Member"]
//const joe = fetch("http://ec2-3-145-21-220.us-east-2.compute.amazonaws.com/wowplayers")
//const joe = fetch("https://ec2-18-221-171-204.us-east-2.compute.amazonaws.com/wowplayers")
const joe = fetch("https://celestialsapi.parkergagliano.com/wowplayers")
joe.then((response) => {
    return response.json()
}).then((data) => {
    console.log(data)
    renderPlayers(data)
  }

)

function renderPlayers(data) {
  data = data.data
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].name)
    if (i % 4 == 0 && i != 0) {
      let temprow = createElement('row mt-4 justify-content-around', temp)
      temp = []
      playercardContainer.appendChild(temprow)
    }
    temp.push(`<div
        id="playercard"
        class="col-md-5 col-sm-8 col-lg-2 rounded-xl mt-5 drop-shadow1 animate__animated animate__fadeInUp"
      >
        <div class="row">
          <img
            class="test-bg-color img-fluid p-0 rounded-xlphoto photo-b-border"
            src="https://celestialsapi.parkergagliano.com/${data[i].name}.png"
            alt=""
          />
        </div>
        
        <div class="row">
          <div class="col">
            <h4 class="text-center text-light">${(data[i].name).toUpperCase()}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="text-center text-light">${data[i].tagline}</h5>
          </div>
        </div>
        <div class="row justify-content-around mb-2 ">
          <a target="_blank"
          rel="noopener noreferrer" href="https://twitch.tv/${data[i].twitch}"class="col-3 d-flex justify-content-center">
            <img src="svgs/twitch.svg" alt="" />
          </a>
          <a target="_blank"
          rel="noopener noreferrer" href="https://twitter.com/${data[i].twitter}"class="col-3 d-flex justify-content-center">
            <img src="svgs/twitter.svg" alt="" />
          </a>
          <a target="_blank"
          rel="noopener noreferrer" href="https://tiktok.com/${data[i].tiktok}"class="col-3 d-flex justify-content-center">
            <img src="svgs/tiktok.svg" alt="" />
          </a>
          <a target="_blank"
          rel="noopener noreferrer" href="https://youtube.com/${data[i].youtube}"class="col-3 d-flex justify-content-center">
            <img src="svgs/youtube.svg" alt="" />
          </a>
        </div>
      </div>`)

  }
  let temprow2 = createElement('row mt-4 justify-content-around', temp)
  playercardContainer.appendChild(temprow2)

}

function createElement(classes, content) {
  let final = document.createElement('div')
  final.className = classes
  for (let i = 0; i < content.length; i++) {
    final.innerHTML += content[i]
  }
  return final

}


//renderPlayers()

