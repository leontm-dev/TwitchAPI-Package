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
}