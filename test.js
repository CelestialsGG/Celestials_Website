let clinetId = "1jld8u8wgq6gptu0aqtn4pwi3icyo4";
let clinetSecret = "xt2ee0rwaj9vuyvbpf6qjiwz8apo2o";
let channelList=['m0xyy','bigrodentt', 'tragiicisbad', 'loltyler1', 'tarik', 'shroud', 'emongg', 'landonkyle', 'summit1g']

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
    let temprow = []
    let temprowonline = 0



    let counter = 0
    streams.forEach((stream) => {
        let { thumbnail_url: thumbnail, title, viewer_count, user_name, game_name} = stream;
        let hdThumbnail = thumbnail
            .replace("{width}", "1280")
            .replace("{height}", "720");


        if (counter % 3 == 0 && counter !=0) {
            temprowoffiline = createElement('row mt-4 justify-content-around', temprow)
            temprow = []
            streamsContainer.appendChild(temprowoffiline)
            
        }
        counter +=1

        temprow.push(`
            <a style="text-decoration: none!important;"href="https://twitch.tv/${user_name}" class="col-md-4 col-sm-12 mt-2 border p-0">
                <div class="row">
                <img class=" img-fluid"src="${hdThumbnail}" alt="" />
                </div>
                <div class="row">
                <div class="col"><h5 class="text-center text-light" style="font-weight: bold">${title}</h5></div>
                </div>

                <div class="row">
                
                    <div class="col">
                    <h5 class="text-left text-light">${user_name}</h5>
                    </div>
                    <div class="col-4"><h5 class="text-center text-light">${viewer_count
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Viewers</h5 class="text-center text-light"></div>
                    <div class="col"><h5 class="text-center text-light">${game_name}</h5></div>
                </div>
               
            </a>
        `)

    });
    if (temprow.length ===1) {

        temprow.push(`
            <div class="col-12 col-md-3">
            </div> 
            `)
            temprow.push(`
        <div class="col-12 col-md-3">
        </div> 
        `)
    }
    if (temprow.length === 2) {
        temprow.push(`
            <div class="col-12 col-md-3">
            </div> 
            `)
    }
    temprowonline = createElement('row mt-4 justify-content-around', temprow)
    streamsContainer.appendChild(temprowonline)

    
    let temprowoffiline = 2
    let row = []
    for (let i=0; i<channelList.length; i++) {
        if (i % 3 == 0 && i !=0) {

            temprowoffiline = createElement('row mt-4 justify-content-around', row)
            row = []

            offlineContainer.appendChild(temprowoffiline)
            
        }
        row.push(`
        <div class="col-12 col-md-3">
        <a style="text-decoration: none!important;"href="https://twitch.tv/${channelList[i]}">
        <h5 class="text-center text-light">${channelList[i]}</h5></a>
        </div> 
        `)
    }
    if (row.length ===1) {

        row.push(`
            <div class="col-12 col-md-3">
            </div> 
            `)
        row.push(`
        <div class="col-12 col-md-3">
        </div> 
        `)
    }
    if (row.length === 2) {
        row.push(`
            <div class="col-12 col-md-3">
            </div> 
            `)
    }
    temprowoffiline = createElement('row mt-4 justify-content-around', row)
    offlineContainer.appendChild(temprowoffiline)


    
    

}


function createElement(classes, content) {
    let final = document.createElement('div')
    final.className = classes
    for (let i = 0; i < content.length; i++) {
        final.innerHTML+= content[i]
    }
    return final

}

getStreams(channelList);