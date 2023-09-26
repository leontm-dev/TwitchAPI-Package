import fetch from "node-fetch";
type API_Token = string;
type CLIENT_Id = string;
class TwitchApiClient {
  /**
   *
   * @param {String} client_id - The client-id of your Twitch Application
   * @param {String} token - The token you want to use for the request. Gotten from Twitch
   */
  token: API_Token = "";
  client_id: CLIENT_Id = "";
  user_id: string = "";
  constructor(client_id: CLIENT_Id, token: API_Token) {
    fetch("https://id.twitch.tv/oauth2/validate", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data: any) => {
        if (data.status == undefined) {
          if (client_id === data.client_id) {
            this.client_id = client_id;
          } else {
            return new Error(
              "ReferenceError: client_id does not match the client_id of the token!"
            );
          }
          this.token = token;
          this.user_id = data.user_id;
        } else {
          throw new Error(`${data.status}: ${data.message}`);
        }
      });
    this.token = token;
  }
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the partner or affiliate broadcaster that wants to run the commercial. This ID must match the user ID found in the OAuth token
  //    * @param {Number} length - The length of the commercial to run, in seconds. Twitch tries to serve a commercial that’s the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds.
  //    * @returns This function returns the data received from the request: Ads-Start Commercial.
  //    */
  //   ads_startCommercial(broadcaster_id, length) {
  //     if (typeof broadcaster_id === String) {
  //       if (typeof length === Number) {
  //         if (broadcaster_id != "") {
  //           fetch("https://api.twitch.tv/helix/channels/commercial", {
  //             method: "POST",
  //             headers: {
  //               Authorization: `Bearer ${this.token}`,
  //               "Client-Id": this.client_id,
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               broadcaster_id: `${broadcaster_id}`,
  //               length: parseInt(length),
  //             }),
  //           })
  //             .then((res) => res.json())
  //             .then((data) => {
  //               return data;
  //             })
  //             .catch((err) => {
  //               return new Error(err);
  //             });
  //         } else {
  //           return new Error("ValueError: broadcaster_id is not defined!");
  //         }
  //       } else {
  //         return new Error("TypeError: length must be an integer!");
  //       }
  //     } else {
  //       return new Error("TypeError: broadcaster_id must be a string!");
  //     }
  //   }
  //   /**
  //    *
  //    * @param {String} extension_id - The extension’s client ID. If specified, the response contains a report for the specified extension. If not specified, the response includes a report for each extension that the authenticated user owns.
  //    * @param {String} type - The type of analytics report to get. Possible values are: overview_v2
  //    * @param {String} started_at - The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). The start date must be on or after January 31, 2018. If you specify an earlier date, the API ignores it and uses January 31, 2018. If you specify a start date, you must specify an end date. If you don’t specify a start and end date, the report includes all available data since January 31, 2018. The report contains one row of data for each day in the reporting window.
  //    * @param {String} ended_at - The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date. Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
  //    * @param {Number} first - The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. NOTE: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
  //    * @param {String} after - The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value. This parameter is ignored if the extension_id parameter is set.
  //    */
  //   analytics_getExtensionAnalytics(
  //     extension_id,
  //     type,
  //     started_at,
  //     ended_at,
  //     first,
  //     after
  //   );
  //   /**
  //    *
  //    * @param {String} game_id - The game’s client ID. If specified, the response contains a report for the specified game. If not specified, the response includes a report for each of the authenticated user’s games.
  //    * @param {String} type - The type of analytics report to get. Possible values are: overview_v2
  //    * @param {String} started_at - The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). If you specify a start date, you must specify an end date. The start date must be within one year of today’s date. If you specify an earlier date, the API ignores it and uses a date that’s one year prior to today’s date. If you don’t specify a start and end date, the report includes all available data for the last 365 days from today. The report contains one row of data for each day in the reporting window.
  //    * @param {*} ended_at - The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date. Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
  //    * @param {*} first - The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. NOTE: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
  //    * @param {*} after - The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value. This parameter is ignored if the extension_id parameter is set.
  //    */
  //   analytics_getGameAnalytics(
  //     game_id,
  //     type,
  //     started_at,
  //     ended_at,
  //     first,
  //     after
  //   ) {
  //     let ID = "";
  //     let TYPE = "";
  //     let START = "";
  //     let END = "";
  //     let FIRST = "";
  //     let AFTER = "";
  //     if (game_id != undefined) {
  //       ID = game_id;
  //     }
  //     if (type != undefined) {
  //       TYPE = type;
  //     }
  //     if (started_at != undefined) {
  //       START = started_at;
  //     }
  //     if (ended_at != undefined) {
  //       END = ended_at;
  //     }
  //     if (first != undefined) {
  //       FIRST = first;
  //     }
  //     if (after != undefined) {
  //       AFTER = after;
  //     }
  //     fetch(
  //       `https://api/twitch.tv/helix/analytics/games?game_id=${ID}&type=${TYPE}&started_at=${START}&ended_at=${END}&first=${FIRST}&after=${AFTER}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${this.token}`,
  //           "Client-Id": this.client_id,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         return data;
  //       })
  //       .catch((err) => {
  //         return new Error(err);
  //       });
  //   }
  //   /**
  //    *
  //    * @param {Number} count - The number of results to return. The minimum count is 1 and the maximum is 100. The default is 10.
  //    * @param {String} period - The time period over which data is aggregated (uses the PST time zone). Possible values are: day — A day spans from 00:00:00 on the day specified in started_at and runs through 00:00:00 of the next day. week — A week spans from 00:00:00 on the Monday of the week specified in started_at and runs through 00:00:00 of the next Monday. month — A month spans from 00:00:00 on the first day of the month specified in started_at and runs through 00:00:00 of the first day of the next month. year — A year spans from 00:00:00 on the first day of the year specified in started_at and runs through 00:00:00 of the first day of the next year. all — Default. The lifetime of the broadcaster's channel.
  //    * @param {String} started_at - The start date, in RFC3339 format, used for determining the aggregation period. Specify this parameter only if you specify the period query parameter. The start date is ignored if period is all. Note that the date is converted to PST before being used, so if you set the start time to 2022-01-01T00:00:00.0Z and period to month, the actual reporting period is December 2021, not January 2022. If you want the reporting period to be January 2022, you must set the start time to 2022-01-01T08:00:00.0Z or 2022-01-01T00:00:00.0-08:00. If your start date uses the ‘+’ offset operator (for example, 2022-01-01T00:00:00.0+05:00), you must URL encode the start date.
  //    * @param {String} user_id - An ID that identifies a user that cheered bits in the channel. If count is greater than 1, the response may include users ranked above and below the specified user. To get the leaderboard’s top leaders, don’t specify a user ID.
  //    */
  //   bits_getBiitsLeaderboard(count, period, started_at, user_id) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster whose custom Cheermotes you want to get. Specify the broadcaster’s ID if you want to include the broadcaster’s Cheermotes in the response (not all broadcasters upload Cheermotes). If not specified, the response contains only global Cheermotes. If the broadcaster uploaded Cheermotes, the type field in the response is set to channel_custom.
  //    */
  //   bits_getCheermotes(broadcaster_id) {}
  //   /**
  //    *
  //    * @param {String} extension_id - The ID of the extension whose list of transactions you want to get.
  //    * @param {String} id - A transaction ID used to filter the list of transactions. Specify this parameter for each transaction you want to get. For example, id=1234&id=5678. You may specify a maximum of 100 IDs.
  //    * @param {Number} first - The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100 items per page. The default is 20.
  //    * @param {String} after The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value.
  //    */
  //   bits_getExtensionTransactions(extension_id, id, first, after) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster whose channel you want to get. To specify more than one ID, include this parameter for each broadcaster you want to get. For example, broadcaster_id=1234&broadcaster_id=5678. You may specify a maximum of 100 IDs. The API ignores duplicate IDs and IDs that are not found.
  //    */
  //   channels_getChannelInformation(broadcaster_id) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster whose channel you want to update. This ID must match the user ID in the user access token.
  //    */
  //   channels_modifyChannelInformation(broadcaster_id) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster that owns the channel. This ID must match the user ID in the access token.
  //    */
  //   channels_getChannelEditors(broadcaster_id) {}
  //   /**
  //    *
  //    * @param {String} user_id - A user’s ID. Returns the list of broadcasters that this user follows. This ID must match the user ID in the user OAuth token.
  //    * @param {String} broadcaster_id - A broadcaster’s ID. Use this parameter to see whether the user follows this broadcaster. If specified, the response contains this broadcaster if the user follows them. If not specified, the response contains all broadcasters that the user follows.
  //    * @param {Number} first - The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
  //    * @param {String} after - The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value.
  //    */
  //   channels_getFollowedChannels(user_id, broadcaster_id, first, after) {}
  //   /**
  //    *
  //    * @param {String} user_id - A user’s ID. Returns the list of broadcasters that this user follows. This ID must match the user ID in the user OAuth token.
  //    * @param {String} broadcaster_id - A broadcaster’s ID. Use this parameter to see whether the user follows this broadcaster. If specified, the response contains this broadcaster if the user follows them. If not specified, the response contains all broadcasters that the user follows.
  //    * @param {Number} first - The maximum number of items to return per page in the response. The minimum page size is 1 item per page and the maximum is 100. The default is 20.
  //    * @param {String} after - The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value.
  //    */
  //   channels_getChannelFollowers(user_id, broadcaster_id, first, after) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster to add the custom reward to. This ID must match the user ID found in the OAuth token.
  //    */
  //   channelPoints_createCustomReward(broadcaster_id) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster that created the custom reward. This ID must match the user ID found in the OAuth token.
  //    * @param {String} id - The ID of the custom reward to delete.
  //    */
  //   channelPoints_deleteCustomReward(broadcaster_id, id) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster whose custom rewards you want to get. This ID must match the user ID found in the OAuth token.
  //    * @param {String} id - A list of IDs to filter the rewards by. To specify more than one ID, include this parameter for each reward you want to get. For example, id=1234&id=5678. You may specify a maximum of 50 IDs. Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
  //    * @param {Boolean} only_manageable_rewards - A Boolean value that determines whether the response contains only the custom rewards that the app may manage (the app is identified by the ID in the Client-Id header). Set to true to get only the custom rewards that the app may manage. The default is false.
  //    */
  //   channelPoints_getCustomReward(broadcaster_id, id, only_manageable_rewards) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster that owns the custom reward. This ID must match the user ID found in the user OAuth token.
  //    * @param {String} reward_id - The ID that identifies the custom reward whose redemptions you want to get.
  //    * @param {String} status - The status of the redemptions to return. The possible case-sensitive values are: CANCELED FULFILLED UNFULFILLED . NOTE: This field is required only if you don’t specify the id query parameter. NOTE: Canceled and fulfilled redemptions are returned for only a few days after they’re canceled or fulfilled.
  //    * @param {String} id - A list of IDs to filter the redemptions by. To specify more than one ID, include this parameter for each redemption you want to get. For example, id=1234&id=5678. You may specify a maximum of 50 IDs. Duplicate IDs are ignored. The response contains only the IDs that were found. If none of the IDs were found, the response is 404 Not Found.
  //    * @param {String} sort - The order to sort redemptions by. The possible case-sensitive values are: OLDEST NEWEST . The default is OLDEST.
  //    * @param {String} after - The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value.
  //    * @param {Number} first - The maximum number of redemptions to return per page in the response. The minimum page size is 1 redemption per page and the maximum is 50. The default is 20.
  //    */
  //   channelPoints_getCustomRewardRedemption(
  //     broadcaster_id,
  //     reward_id,
  //     status,
  //     id,
  //     sort,
  //     after,
  //     first
  //   ) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster that’s updating the reward. This ID must match the user ID found in the OAuth token.
  //    * @param {String} id - The ID of the reward to update.
  //    */
  //   channelPoints_updateCustomReward(broadcaster_id, id) {}
  //   /**
  //    *
  //    * @param {String} id - A list of IDs that identify the redemptions to update. To specify more than one ID, include this parameter for each redemption you want to update. For example, id=1234&id=5678. You may specify a maximum of 50 IDs.A list of IDs that identify the redemptions to update. To specify more than one ID, include this parameter for each redemption you want to update. For example, id=1234&id=5678. You may specify a maximum of 50 IDs.
  //    * @param {String} broadcaster_id - The ID of the broadcaster that’s updating the redemption. This ID must match the user ID in the user access token.
  //    * @param {String} reward_id - The ID that identifies the reward that’s been redeemed.
  //    */
  //   channelPoints_updateRedemptionStatus(id, broadcaster_id, reward_id) {}
  //   /**
  //    *
  //    * @param {String} broadcaster_id - The ID of the broadcaster that’s currently running a charity campaign. This ID must match the user ID in the access token.
  //    */
  //   charity_getCharityCampaign(broadcaster_id) {}
  //   charity_getCharityCampaignDonations() {}
  //   chat_getChatters() {}
  //   chat_getChannelEmotes() {}
  //   chat_getGlobalEmotes() {}
  //   chat_getEmoteSets() {}
  //   chat_getChannelChatBadges() {}
  //   chat_getGlobalChatBadges() {}
  //   chat_getChatSettings() {}
  //   chat_updateChatSettins() {}
  //   chat_getChatSettings() {}
  //   chat_updateChatSettings() {}
  //   chat_sendChatAnnouncement() {}
  //   chat_sendAShoutout() {}
  //   chat_getUserChatColor() {}
  //   chat_updateUserChatColor() {}
  //   clips_createClip() {}
  //   clips_getClips() {}
  //   entitlements_getDropsEntitlements() {}
  //   entitlements_updateDropsEntitlements() {}
  //   extensions_getExtensionConfigurationSegment() {}
  //   extensions_setExtensionConfigurationSegment() {}
  //   extensions_sendExtensionPubSubMessage() {}
  //   extensions_getExtensionLiveChannels() {}
  //   extensions_getExtensionSecrets() {}
  //   extensions_createExtensionSecret() {}
  //   extensions_sendExtensionChatMessage() {}
  //   extensions_getExtensions() {}
  //   extensions_getReleasedExtensions() {}
  //   extensions_getExtensionBitsProducts() {}
  //   extensions_updateExtensionBitsProduct() {}
  //   eventSub_createEventSubSubscription() {}
  //   eventSub_deleteEventSubSubscription() {}
  //   eventSub_getEventSubSubspricptions() {}
  //   games_getTopGames() {}
  //   games_getGames() {}
  //   goals_getCreatorGoals() {}
  //   hypeTrain_getHypeTrainEvents() {}
  //   moderation_checkAutoModStatus() {}
  //   moderation_messageHeldAutoModMessages() {}
  //   moderation_getAutoModSettings() {}
  //   moderation_updateAutoModSettings() {}
  //   moderation_getBannedUsers() {}
  //   moderation_banUser() {}
  //   moderation_unbanUser() {}
  //   moderation_getBlockedTerms() {}
  //   moderation_addBlockedTerm() {}
  //   moderation_removeBlockedTerm() {}
  //   moderation_deleteChatMessages() {}
  //   moderation_getModerators() {}
  //   moderation_addChannelModerator() {}
  //   moderation_removeChannelModerator() {}
  //   moderation_getVIPs() {}
  //   moderation_addChannelVIP() {}
  //   moderation_removeChannelVIP() {}
  //   moderation_updateShieldModeStatus() {}
  //   moderation_getShieldModeStatus() {}
  //   polls_getPolls() {}
  //   polls_createPolls() {}
  //   polls_endPoll() {}
  //   predictions_getPredictions() {}
  //   predictions_createPrediction() {}
  //   predictions_endPrediction() {}
  //   raids_startARaid() {}
  //   raids_cancelARaid() {}
  //   schedule_getChannelStreamSchedule() {}
  //   schedule_getChannelICalendar() {}
  //   schedule_updateChannelStreamSchedule() {}
  //   schedule_createChannelStreamScheduleSegment() {}
  //   schedule_updateChannelStreamScheduleSegment() {}
  //   schedule_deleteChannelStreamScheduleSegment() {}
  //   search_searchCategories() {}
  //   search_searchChannels() {}
  //   music_getSoundtrackCurrentTrack() {}
  //   music_getSoundtrackPlaylist() {}
  //   music_getSoundtrackPlaylists() {}
  //   streams_getStreamKey() {}
  //   streams_getStreams() {}
  //   streams_getFollowedStreams() {}
  //   streams_createStreamMarker() {}
  //   streams_getStreamMarkers() {}
  //   subscriptions_getBroadcasterSubscriptions() {}
  //   subscriptions_checkUserSubscription() {}
  //   tags_getAllStreamTags() {}
  //   tags_getStreamTags() {}
  //   teams_getChannelTeam() {}
  //   teams_getTeams() {}
  //   users_getUsers() {}
  //   users_updateUser() {}
  //   users_getUsersFollows() {}
  //   users_getUserBlockList() {}
  //   users_blockUser() {}
  //   users_unblockUser() {}
  //   users_getUserExtensions() {}
  //   users_getUserActiveExtensions() {}
  //   users_updateUserExtensions() {}
  //   videos_getVideos() {}
  //   videos_deleteVideos() {}
  //   whispers_sendWhisper() {}
}
