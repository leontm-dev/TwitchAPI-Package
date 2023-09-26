import { ApiToken, ClientId } from "../types";
import {
  getExtensionAnalyticsResponse,
  getGameAnalyticsReponse,
} from "../interfaces";
export default class Analytics {
  apiToken = "";
  clientId = "";
  constructor(token: ApiToken, id: ClientId) {
    this.apiToken = token;
    this.clientId = id;
  }
  /**
   * @description Gets an analytics report for one or more extensions. The response contains the URLs used to download the reports (CSV files).
   * @param {string} [extension_id] The extension’s client ID. If specified, the response contains a report for the specified extension. If not specified, the response includes a report for each extension that the authenticated user owns.
   * @param {string} [type] The type of analytics report to get. Possible values are: overview_v2
   * @param {string} [started_at] The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). The start date must be on or after January 31, 2018. If you specify an earlier date, the API ignores it and uses January 31, 2018. If you specify a start date, you must specify an end date. If you don’t specify a start and end date, the report includes all available data since January 31, 2018. The report contains one row of data for each day in the reporting window.
   * @param {string} [ended_at] The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date. Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
   * @param {number} [first] The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. NOTE: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
   * @param {number} [after] The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value. This parameter is ignored if the extension_id parameter is set.
   */
  getExtensionAnalytics(
    extension_id?: string,
    type?: "overview_v2",
    started_at?: string,
    ended_at?: string,
    first?: number,
    after?: number
  ) {
    fetch(
      `https://api.twitch.tv/helix/analytics/extensions?extension_id=${extension_id}&type=${type}&started_at=${started_at}&ended_at=${ended_at}&first=${first}&after=${after}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Client-Id": `${this.clientId}`,
        },
      }
    )
      .then((res) => {
        return res;
      })
      .then(async (data) => {
        if (data.status === 200) {
          let object: getExtensionAnalyticsResponse = await data.json();
          return object;
        } else if (data.status === 400) {
          return {
            code: 400,
            title: "Bad Request",
            message:
              "The start and end dates are optional but if you specify one, you must specify the other. \nThe end date must be equal to or later than the start date. \nThe cursor specified in the after query parameter is not valid. \nThe resource supports only forward pagination (use the after query parameter). \nThe first query parameter is outside the allowed range of values.",
          };
        } else if (data.status === 401) {
          return {
            code: 401,
            title: "Unauthorized",
            message:
              "The Authorization header is required and must contain a user access token. \nThe user access token must include the analytics:read:extensions scope. \nThe OAuth token is not valid. \nThe Client-Id header is required. \nThe client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.",
          };
        } else if (data.status === 404) {
          return {
            code: 404,
            title: "Not Found",
            message:
              "The extension specified in the extension_id query parameter was not found.",
          };
        }
      });
  }
  /**
   * @description Gets an analytics report for one or more games. The response contains the URLs used to download the reports (CSV files).
   * @param {string} [game_id] The game’s client ID. If specified, the response contains a report for the specified game. If not specified, the response includes a report for each of the authenticated user’s games.
   * @param {string} [type] The type of analytics report to get. Possible values are: overview_v2
   * @param {string} [started_at] The reporting window’s start date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-22T00:00:00Z). The start date must be on or after January 31, 2018. If you specify an earlier date, the API ignores it and uses January 31, 2018. If you specify a start date, you must specify an end date. If you don’t specify a start and end date, the report includes all available data since January 31, 2018. The report contains one row of data for each day in the reporting window.
   * @param {string} [ended_at] The reporting window’s end date, in RFC3339 format. Set the time portion to zeroes (for example, 2021-10-27T00:00:00Z). The report is inclusive of the end date. Specify an end date only if you provide a start date. Because it can take up to two days for the data to be available, you must specify an end date that’s earlier than today minus one to two days. If not, the API ignores your end date and uses an end date that is today minus one to two days.
   * @param {number} [first] The maximum number of report URLs to return per page in the response. The minimum page size is 1 URL per page and the maximum is 100 URLs per page. The default is 20. NOTE: While you may specify a maximum value of 100, the response will contain at most 20 URLs per page.
   * @param {number} [after] The cursor used to get the next page of results. The Pagination object in the response contains the cursor’s value. This parameter is ignored if the extension_id parameter is set.
   */
  getGameAnalytics(
    game_id?: string,
    type?: "overview_v2",
    started_at?: string,
    ended_at?: string,
    first?: number,
    after?: number
  ) {
    fetch(
      `https://api.twitch.tv/helix/analytics/games?game_id=${game_id}&type=${type}&started_at=${started_at}&ended_at=${ended_at}&first=${first}&after=${after}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Client-Id": `${this.clientId}`,
        },
      }
    )
      .then((res) => {
        return res;
      })
      .then(async (data) => {
        if (data.status === 200) {
          const object: getGameAnalyticsReponse = await data.json();
          return object;
        } else if (data.status === 400) {
          return {
            code: 400,
            title: "Bad Request",
            message:
              "The start and end dates are optional but if you specify one, you must specify the other. \nThe end date must be equal to or later than the start date. \nThe cursor specified in the after query parameter is not valid. \nThe resource supports only forward pagination (use the after query parameter). \nThe first query parameter is outside the allowed range of values.",
          };
        } else if (data.status === 401) {
          return {
            code: 401,
            title: "Unauthorized",
            message:
              "The Authorization header is required and must contain a user access token. \nThe user access token must include the analytics:read:games scope. \nThe OAuth token is not valid. \nThe Client-Id header is required. \nThe client ID specified in the Client-Id header does not match the client ID specified in the OAuth token.",
          };
        } else if (data.status === 404) {
          return {
            code: 404,
            title: "Not Found",
            message:
              "The extension specified in the game_id query parameter was not found.",
          };
        }
      });
  }
}
