let clinetId = "1jld8u8wgq6gptu0aqtn4pwi3icyo4";
let clinetSecret = "xt2ee0rwaj9vuyvbpf6qjiwz8apo2o";
let channelList=['bigrodentt', 'tragiicisbad', 'loltyler1', 'tarik', 'shroud', 'landonkyle']

function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

    return fetch(url, {
    method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    });
}

async function getStreams(channelList) {
    let finalstreamerList = ''
        let streamListLength = channelList.length
        for (let i = 0; i < channelList.length; i++) {
            if (streamListLength != i+1) {
                finalstreamerList += `user_login=${channelList[i]}&`
            }
            else {
                finalstreamerList += `user_login=${channelList[i]}`
            }
            
        }

    
        const endpoint = `https://api.twitch.tv/helix/streams?${finalstreamerList}`;

    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
    authorization,
    "Client-Id": clinetId,
    };

    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderStreams(data));
}

function renderStreams(data) {
    let { data: streams } = data;
    let streamsContainer = document.getElementById("joemama");
    let offlineContainer = document.getElementById("offlineContainer");
    streamsContainer.innerHTML = "";
    let temprow = document.createElement('div')
    temprow.classList='row'

    console.log(channelList)
    let ttee = 0
    streams.forEach((stream) => {
        ttee +=1
        console.log('test')
        let { thumbnail_url: thumbnail, title, viewer_count, user_name} = stream;
        let hdThumbnail = thumbnail
            .replace("{width}", "1280")
            .replace("{height}", "720");

        streamsContainer.innerHTML += `

            <div class="col-md-4 col-sm-12 mt-2 border">
                <div class="row">
                <img class=" img-fluid"src="${hdThumbnail}" alt="" />
                </div>
                <div class="row">
                <div class="col"><h5 style="font-weight: bold">${title}</h5></div>
                </div>
                <div class="row">
                    <div class="col-auto">
                    <h5 class="text-left">${user_name}</h5>
                    </div>
                    <div class="col"><h5>${viewer_count
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Viewers</h5></div>
                
            </div>
            

        `;
        if (channelList.includes(stream.user_name)) {
            channelList.splice(channelList.indexOf(stream.user_name), 1);
        }
    });
    
    
    let temp = 0
    let tempBool = true
    let row = document.createElement('div')
    row.className='row mt-3'
    for (let i=0; i<channelList.length; i++) {
        let oneElement = document.createElement('div')
        oneElement.className = "col-md-4 col-sm-12 mt-2"

        temp+=1
        offlineContainer.innerHTML += `
        <div class="col-auto">
        <a style="text-decoration: none!important;"href=https://twitch.tv/${channelList[i]}>
        <h5 class="text-center text-light">${channelList[i]}</h5></a>
        </div> 
        `
    }

    
    

}

getStreams(channelList);