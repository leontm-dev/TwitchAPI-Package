import { UserId, ApiToken, ClientId } from "../types";
import { startCommercialResponse } from "../interfaces";
export default class Ads {
  apiToken = "";
  clientId = "";
  constructor(token: ApiToken, id: ClientId) {
    this.apiToken = token;
    this.clientId = id;
  }
  /**
   * @description Starts a commercial on the specified channel.
   * @param { UserId } broadcaster_id The ID of the partner or affiliate broadcaster that wants to run the commercial. This ID must match the user ID found in the OAuth token.
   * @param { number } length The length of the commercial to run, in seconds. Twitch tries to serve a commercial that’s the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds.
   */
  startCommercial(broadcaster_id: UserId, length: number) {
    fetch("https://api.twitch.tv/helix/channels/commercial", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Client-Id": `${this.clientId}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        broadcaster_id: `${broadcaster_id}`,
        length: length,
      }),
    })
      .then((res) => {
        return res;
      })
      .then(async (data) => {
        if (data.status === 200) {
          let object: startCommercialResponse = await data.json();
          return object.data[0];
        } else if (data.status === 400) {
          return {
            code: 400,
            title: "Bad Request",
            message:
              "The broadcaster_id query parameter is required. \n The length query parameter is required. \nThe ID in broadcaster_id is not valid. To start a commercial, the broadcaster must be streaming live.\nThe broadcaster may not run another commercial until the cooldown period expires. The retry_after field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials.",
          };
        } else if (data.status === 401) {
          return {
            code: 401,
            title: "Unauthorized",
            message:
              "The ID in broadcaster_id must match the user ID found in the request's OAuth token. \nThe Authorization header is required and must contain a user access token.\nThe user access token must include the channel:edit:commercial scope.\nThe OAuth token is not valid.\nThe client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.",
          };
        } else if (data.status === 404) {
          return {
            code: 404,
            title: "Not Found",
            message: "The ID in broadcaster_id was not found.",
          };
        } else if (data.status === 429) {
          return {
            code: 429,
            title: "Too Many Requests",
            message:
              "The broadcaster may not run another commercial until the cooldown period expires. The retry_after field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials.",
          };
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
