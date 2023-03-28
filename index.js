const fetch = require("node-fetch");
class TwitchApiClient {
    /**
     * 
     * @param {String} client_id - The client-id of your Twitch Application
     * @param {String} token - The token you want to use for the request. Gotten from Twitch
     */
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
    /**
     * 
     * @param {String} broadcaster_id - The ID of the partner or affiliate broadcaster that wants to run the commercial. This ID must match the user ID found in the OAuth token
     * @param {Number} length - The length of the commercial to run, in seconds. Twitch tries to serve a commercial that’s the requested length, but it may be shorter or longer. The maximum length you should request is 180 seconds.
     * @returns This function returns the data received from the request: Ads-Start Commercial.
     */
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
    };
    /**
     * 
     * @param {String} game_id - The game’s client ID. If specified, the response contains a report for the specified game. If not specified, the response includes a report for each of the authenticated user’s games.
     * @param {String} type - The type of analytics report to get. Possible values are: overview_v2
     * @param {String} started_at - The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). If you specify a start date, you must specify an end date. The start date must be within one year of today’s date. If you specify an earlier date, the API ignores it and uses a date that’s one year prior to today’s date. If you don’t specify a start and end date, the report includes all available data for the last 365 days from today. The report contains one row of data for each day in the reporting window.
     * @param {*} ended_at - The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date. Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
     * @param {*} first - The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. NOTE: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
     * @param {*} after - The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value. This parameter is ignored if the extension_id parameter is set.
     */
    analytics_getExtensionAnalytics(game_id, type, started_at, ended_at, first, after) {
        let ID = "";
        let TYPE = "";
        let START = "";
        let END = "";
        let FIRST = "";
        let AFTER = "";
        if (game_id != undefined) {
            ID = game_id;
        };
        if (type != undefined) {
            TYPE = type;
        };
        if (started_at != undefined) {
            START = started_at;
        };
        if (ended_at != undefined) {
            END = ended_at;
        };
        if (first != undefined) {
            FIRST = first;
        };
        if (after != undefined) {
            AFTER = after;
        };
        fetch(`https://api/twitch.tv/helix/analytics/games?game_id=${ID}&type=${TYPE}&started_at=${START}&ended_at=${END}&first=${FIRST}&after=${AFTER}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Client-Id": this.client_id,
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => {
            return new Error(err);
        })
    };
    /**
     * 
     * @param {Number} count - The number of results to return. The minimum count is 1 and the maximum is 100. The default is 10.
     * @param {String} period - The time period over which data is aggregated (uses the PST time zone). Possible values are: day — A day spans from 00:00:00 on the day specified in started_at and runs through 00:00:00 of the next day. week — A week spans from 00:00:00 on the Monday of the week specified in started_at and runs through 00:00:00 of the next Monday. month — A month spans from 00:00:00 on the first day of the month specified in started_at and runs through 00:00:00 of the first day of the next month. year — A year spans from 00:00:00 on the first day of the year specified in started_at and runs through 00:00:00 of the first day of the next year. all — Default. The lifetime of the broadcaster's channel.
     * @param {String} started_at - The start date, in RFC3339 format, used for determining the aggregation period. Specify this parameter only if you specify the period query parameter. The start date is ignored if period is all. Note that the date is converted to PST before being used, so if you set the start time to 2022-01-01T00:00:00.0Z and period to month, the actual reporting period is December 2021, not January 2022. If you want the reporting period to be January 2022, you must set the start time to 2022-01-01T08:00:00.0Z or 2022-01-01T00:00:00.0-08:00. If your start date uses the ‘+’ offset operator (for example, 2022-01-01T00:00:00.0+05:00), you must URL encode the start date.
     * @param {String} user_id - An ID that identifies a user that cheered bits in the channel. If count is greater than 1, the response may include users ranked above and below the specified user. To get the leaderboard’s top leaders, don’t specify a user ID.
     */
    analytics_getGameAnalytics(count, period, started_at, user_id) {

    };
    bits_getBiitsLeaderboard() {};
    bits_getCheermotes() {};
    bits_getExtensionTransactions() {};
    channels_getChannelInformation() {};
    channels_modifyChannelInformation() {};
    channels_getChannelEditors() {};
    channels_getFollowedChannels() {};
    channels_getChannelFollowers() {};
    channelPoints_createCustomReward() {};
    channelPoints_deleteCustomReward() {};
    channelPoints_getCustomReward() {};
    channelPoints_getCustomRewardRedemption() {};
    channelPoints_updateCustomReward() {};
    channelPoints_updateRedemptionStatus() {};
    charity_getCharityCampaign() {};
    charity_getCharityCampaignDonations() {};
    chat_getChatters() {};
    chat_getChannelEmotes() {};
    chat_getGlobalEmotes() {};
    chat_getEmoteSets() {};
    chat_getChannelChatBadges() {};
    chat_getGlobalChatBadges() {};
    chat_getChatSettings() {};
    chat_updateChatSettins() {};
    chat_getChatSettings() {};
    chat_updateChatSettings() {};
    chat_sendChatAnnouncement() {};
    chat_sendAShoutout() {};
    chat_getUserChatColor() {};
    chat_updateUserChatColor() {};
    clips_createClip() {};
    clips_getClips() {};
    entitlements_getDropsEntitlements() {};
    entitlements_updateDropsEntitlements() {};
    extensions_getExtensionConfigurationSegment() {};
    extensions_setExtensionConfigurationSegment() {};
    extensions_sendExtensionPubSubMessage() {};
    extensions_getExtensionLiveChannels() {};
    extensions_getExtensionSecrets() {};
    extensions_createExtensionSecret() {};
    extensions_sendExtensionChatMessage() {};
    extensions_getExtensions() {};
    extensions_getReleasedExtensions() {};
    extensions_getExtensionBitsProducts() {};
    extensions_updateExtensionBitsProduct() {};
    eventSub_createEventSubSubscription() {};
    eventSub_deleteEventSubSubscription() {};
    eventSub_getEventSubSubspricptions() {};
    games_getTopGames() {};
    games_getGames() {};
    goals_getCreatorGoals() {};
    hypeTrain_getHypeTrainEvents() {};
    moderation_checkAutoModStatus() {};
    moderation_messageHeldAutoModMessages() {};
    moderation_getAutoModSettings() {};
    moderation_updateAutoModSettings() {};
    moderation_getBannedUsers() {};
    moderation_banUser() {};
    moderation_unbanUser() {};
    moderation_getBlockedTerms() {};
    moderation_addBlockedTerm() {};
    moderation_removeBlockedTerm() {};
    moderation_deleteChatMessages() {};
    moderation_getModerators() {};
    moderation_addChannelModerator() {};
    moderation_removeChannelModerator() {};
    moderation_getVIPs() {};
    moderation_addChannelVIP() {};
    moderation_removeChannelVIP() {};
    moderation_updateShieldModeStatus() {};
    moderation_getShieldModeStatus() {};
    polls_getPolls() {};
    polls_createPolls() {};
    polls_endPoll() {};
    predictions_getPredictions() {};
    predictions_createPrediction() {};
    predictions_endPrediction() {};
    raids_startARaid() {};
    raids_cancelARaid() {};
    schedule_getChannelStreamSchedule() {};
    schedule_getChannelICalendar() {};
    schedule_updateChannelStreamSchedule() {};
    schedule_createChannelStreamScheduleSegment() {};
    schedule_updateChannelStreamScheduleSegment() {};
    schedule_deleteChannelStreamScheduleSegment() {};
    search_searchCategories() {};
    search_searchChannels() {};
    music_getSoundtrackCurrentTrack() {};
    music_getSoundtrackPlaylist() {};
    music_getSoundtrackPlaylists() {};
    streams_getStreamKey() {};
    streams_getStreams() {};
    streams_getFollowedStreams() {};
    streams_createStreamMarker() {};
    streams_getStreamMarkers() {};
    subscriptions_getBroadcasterSubscriptions() {};
    subscriptions_checkUserSubscription() {};
    tags_getAllStreamTags() {};
    tags_getStreamTags() {};
    teams_getChannelTeam() {};
    teams_getTeams() {};
    users_getUsers() {};
    users_updateUser() {};
    users_getUsersFollows() {};
    users_getUserBlockList() {};
    users_blockUser() {};
    users_unblockUser() {};
    users_getUserExtensions() {};
    users_getUserActiveExtensions() {};
    users_updateUserExtensions() {};
    videos_getVideos() {};
    videos_deleteVideos() {};
    whispers_sendWhisper() {};
};