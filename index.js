const fetch = require("node-fetch");
class TwitchApiClient {
    constructor(client_id, token) {
        fetch("https://id.twitch.tv/oauth2/validate",
            {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }
        )
        .then(res => {
            res.json();
        })
        .then(data => {
            if (data.status == undefined) {
                if (client_id === data.client_id) {
                    this.client_id = client_id;
                } else {
                    return new Error("ReferenceError: client_id does not match the client_id of the token!");
                };
                this.token = token;
                this.user_id = data.user_id;
            } else {
                return new Error(`${data.status}: ${data.message}`)
            }
        })
        this.token = token;
    };
    ads_startCommercial(broadcaster_id, length) {
        if (typeof broadcaster_id === String) {
            if (typeof length === Number) {
                if (broadcaster_id != "") {
                    fetch("https://api.twitch.tv/helix/channels/commercial",
                        {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${this.token}`,
                                "Client-Id": this.client_id,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "broadcaster_id": `${broadcaster_id}`,
                                "length": parseInt(length)
                            })
                        }
                    )
                    .then(res => res.json())
                    .then(data => {
                        return data
                    })
                    .catch(err => {
                        return new Error(err)
                    })
                } else {
                    return new Error("ValueError: broadcaster_id is not defined!")
                }
            } else {
                return new Error("TypeError: length must be an integer!");
            }
        } else {
            return new Error("TypeError: broadcaster_id must be a string!");
        }
    }
}