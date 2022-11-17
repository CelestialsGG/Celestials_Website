let clinetId = "1jld8u8wgq6gptu0aqtn4pwi3icyo4"; let clinetSecret = "xt2ee0rwaj9vuyvbpf6qjiwz8apo2o";
let channelList = ['landonkyle', 'theedrewski','whiiskeyz', 'bigrodentt', 'tragiicisbad', 'crawel077', 'collindood']


function generateAnimation(count, streams) {
    console.log(count)
    if ( ([1,4,7, 10, 13, 16, 19, 22]).includes(count)) {
        return 'animate__fadeInLeft'
    }
    if (([3, 6, 9, 12, 15, 18, 21, 24]).includes(count)) {
        return 'animate__fadeInRight'
    }
    if (count == streams.length)    {
        return 'animate__fadeInRight'
    }
    
    return 'animate__fadeIn'
    

}


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
        if (streamListLength != i + 1) {
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
    let streamsContainer = document.getElementById("insert");
    let offlineContainer = document.getElementById("offlineContainer");

    let temprow = []
    let temprowonline = 0

    let animationCounter = 0

    let counter = 0
    streams.forEach((stream) => {
        let { thumbnail_url: thumbnail, title, viewer_count, user_name, game_name } = stream;
        let hdThumbnail = thumbnail
            .replace("{width}", "1280")
            .replace("{height}", "720");


        if (counter % 3 == 0 && counter != 0) {
            let temprowoffiline = createElement('row mt-4 justify-content-around', temprow)
            temprow = []
            streamsContainer.appendChild(temprowoffiline)

        }
        if (title.length > 38) {
            title = title.substring(0, 37)
            title += ".."
        }
        counter += 1
        animationCounter += 1
        temprow.push(`
            <a target="_blank"
            rel="noopener noreferrer" style="text-decoration: none!important;"href="https://twitch.tv/${user_name}" class="animate__animated  ${generateAnimation(animationCounter, streams)} border rounded-xl col-12 col-md-3 mt-2 twitchgrad drop-shadow1">
                <div class="row">
                <img class=" rounded-photo rounded-xlphoto img-fluid border-light p-0"src="${hdThumbnail}" alt="" />
                </div>
                <div class="row p-0 border-top border-light">
                <div class="col"><h5 class="text-center text-light p-0">${title}</h5></div>
                </div>
                <div class="row align-items-center">
                
                    <div class="col p-0 ">
                    <h5 class="text-center title">${user_name}</h5>
                    </div>
                    <div class="col col-md-4 p-0"><h5  class="text-center text-light">${viewer_count
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Viewers</h5 class="text-center text-light"></div>
                    <div class="col"><h5  class="text-center text-light">${game_name}</h5></div>
                </div>
               
            </a>
        `)
        if (channelList.includes((stream.user_name).toLowerCase())) {
            channelList.splice(channelList.indexOf((stream.user_name).toLowerCase()), 1);
        }

    });
    if (temprow.length === 1) {

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
    for (let i = 0; i < channelList.length; i++) {
        if (i % 3 == 0 && i != 0) {

            temprowoffiline = createElement('row mt-4 justify-content-around', row)
            row = []

            offlineContainer.appendChild(temprowoffiline)

        }
        row.push(`
        <div class="col-12 col-md-3 animate__animated animate__fadeInUp">
        <a target="_blank"
        rel="noopener noreferrer" style="text-decoration: none!important;"href="https://twitch.tv/${channelList[i]}">
        <h5 class="text-center text-light">${channelList[i]}</h5></a>
        </div> 
        `)
    }
    if (row.length === 1) {

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
        final.innerHTML += content[i]
    }
    return final

}



//joe = fetch('http://127.0.0.1:8000/addplayers?name=joe?age=12?city=chicagohttp://127.0.0.1:8000/addplayers?name=dasd&age=das&city=das')



//hoe = joe.then((res) => res.json())
//hoe.then((data) => {
//    console.log(data)})


//console.log(joe)

getStreams(channelList);