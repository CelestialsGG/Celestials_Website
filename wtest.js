let playercardContainer = document.getElementById('grad2')
playercardContainer.innerHTML = ''
let temp = []
const players = [
    {
        name: 'Aki', socials: {twitch: "", twitter: '', youtube: ""} 
    },
    {
        name: 'Askuru', socials: {twitch: "joe", twitter: '', youtube: ""} 
    },
    {
        name: 'Cloudsteppa', socials: {twitch: "", twitter: '', youtube: ""} 
    },
    {
        name: 'Craweldaddy', socials: {twitch: "", twitter: '', youtube: ""} 
    }
]

function renderPlayers() {
    for (let i = 0; i < players.length; i++) {
        temp+=`<div
        id="playercard"
        class="col-sm-8 col-md-3 bg-primary rounded-xl mt-5"
      >
        <div class="row">
          <img
            class="img-fluid p-0 rounded-xlphoto"
            src="../images/8x10headshotexample.png"
            alt=""
          />
        </div>
        <div class="">
          <div class="col">
            <h3 class="text-center text-light">Kyle Landon</h3>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h5 class="text-center text-light">Guild Leader</h5>
          </div>
        </div>
        <div class="row justify-content-around mb-2">
          <div class="col-3 d-flex justify-content-center">
            <img src="../svgs/twitch.svg" alt="" />
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img src="../svgs/twitter.svg" alt="" />
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img src="../svgs/tiktok.svg" alt="" />
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img src="../svgs/youtube.svg" alt="" />
          </div>
        </div>
      </div>`
    
    }

}

renderPlayers();