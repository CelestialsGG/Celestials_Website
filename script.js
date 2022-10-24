class twitchAPI {
    constructor(clientId, clientSecret, channelList) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this.channelList = channelList;
    }

    async getTwitchAuthorization() {
        let id = this.clientId;
        let secret = this.clientSecret;
        let url = `https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`;
    
        return fetch(url, {
        method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    }
    
    async getStreams() {
        let finalstreamerList = ''
        let streamListLength = this.channelList.length
        for (let i = 0; i < this.channelList.length; i++) {
            if (streamListLength != i+1) {
                finalstreamerList += `user_login=${this.channelList[i]}&`
            }
            else {
                finalstreamerList += `user_login=${this.channelList[i]}`
            }
            
        }

    
        const endpoint = `https://api.twitch.tv/helix/streams?${finalstreamerList}`;
       // const endpoint = 'https://api.twitch.tv/helix/streams?user_login=loltyler1&user_login=tragiicisbad&user_login=xqc' ;
    
        let authorizationObject = await this.getTwitchAuthorization();
        let { access_token, expires_in, token_type } = authorizationObject;
    
        //token_type first letter must be uppercase    

        token_type = 
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length);
    
        let authorization = `${token_type} ${access_token}`;
    
        let headers = {
        authorization,
        "Client-Id": this.clientId,
        };
    
        fetch(endpoint, {
            headers,
            })
            .then((res) => res.json())
            .then((data) => this.renderStreams(data));
        }
        

        renderStreams(data) {
            return JSON.stringify(data)}
        
    

    }
    getAPIButton = document.getElementById("getAPIButton");
    let callAPI = new twitchAPI(clientId='1jld8u8wgq6gptu0aqtn4pwi3icyo4', clientSecret='xt2ee0rwaj9vuyvbpf6qjiwz8apo2o', channelList=['bigrodentt', 'tragiicisbad', 'loltyler1', 'lirik', 'shroud'])
    
    getAPIButton.addEventListener("click", getAPI)

    function getAPI() {
        let rawdata= callAPI.getStreams()
        console.log(rawdata)
    }