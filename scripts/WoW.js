let playercardContainer = document.getElementById('insert')
playercardContainer.innerHTML = ''
let temp = []
const players = [
  {
    name: 'Kyle', message: "Guild Leader", socials: { twitch: "landonkyle", twitter: '_kylelandon', youtube: "" }
  },
  {
    name: 'Drew', message: "Lead Officer", socials: { twitch: "theedrewski", twitter: '', youtube: "" }
  }, 
  {
    name: 'Craweldaddy', message: "Officer", socials: { twitch: "", twitter: '', youtube: "" }
  },
  {
    name: 'Morni', message: "Officer", socials: { twitch: "", twitter: '', youtube: "" }
  },
  {
    name: 'Venividivici', message: "Treasurer", socials: { twitch: "", twitter: '', youtube: "" }
  },
  {
    name: 'Cloudsteppa', message: "Raider", socials: { twitch: "", twitter: '', youtube: "" }
  },
  {
    name: 'Noxus', message: "Raider", socials: { twitch: "", twitter: '', youtube: "" }
  },
  { 
    name: 'Rain Vongola', message: "Raider", socials: { twitch: "", twitter: '', youtube: "" } 
  },
  
  {
    name: 'Rarely', message: "Raider", socials: { twitch: "", twitter: '', youtube: "" }
  },
  {
    name: 'Torqaan', message: "Raider", socials: { twitch: "", twitter: '', youtube: "" }
  },
  {
    name: 'Navarone', message: "Member", socials: { twitch: "", twitter: '', youtube: "" }
  },
  { 
    name: 'Nilloc', message: "Member", socials: { twitch: "collindood", twitter: '', youtube: "" } 
  },


]

function renderPlayers() {
  for (let i = 0; i < players.length; i++) {
    if (i % 4 == 0 && i != 0) {
      let temprow = createElement('row mt-4 justify-content-around', temp)
      temp = []
      playercardContainer.appendChild(temprow)
    }
    temp.push(`<div
        id="playercard"
        class="col-md-5 col-sm-8 col-lg-2 rounded-xl mt-5 drop-shadow1"
      >
        <div class="row">
          <img
            class="test-bg-color img-fluid p-0 rounded-xlphoto photo-b-border"
            src="NEWHEADSHOTS/${players[i].name}.png"
            alt=""
          />
        </div>
        
        <div class="row">
          <div class="col">
            <h4 class="text-center text-light">${(players[i].name).toUpperCase()}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="text-center text-light">${players[i].message}</h5>
          </div>
        </div>
        <div class="row justify-content-around mb-2 ">
          <a target="_blank"
          rel="noopener noreferrer" href="https://twitch.tv/${players[i].socials.twitch}"class="col-3 d-flex justify-content-center">
            <img src="svgs/twitch.svg" alt="" />
          </a>
          <a target="_blank"
          rel="noopener noreferrer" href="https://twitter.com/${players[i].socials.twitter}"class="col-3 d-flex justify-content-center">
            <img src="svgs/twitter.svg" alt="" />
          </a>
          <a target="_blank"
          rel="noopener noreferrer" href="https://tiktok.com/${players[i]}"class="col-3 d-flex justify-content-center">
            <img src="svgs/tiktok.svg" alt="" />
          </a>
          <a target="_blank"
          rel="noopener noreferrer" href="https://youtube.com/${players[i].socials.youtube}"class="col-3 d-flex justify-content-center">
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

renderPlayers();