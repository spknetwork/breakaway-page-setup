import { keychainBroadcast } from "../helpers/keychain";
import { SERVERS } from "../constants/servers";

import { Client } from "@hiveio/dhive";

const client = new Client(SERVERS, {
  timeout: 3000,
  failoverThreshold: 3,
  consoleOnFailover: true
});

const bridgeApiCall = (endpoint, params) =>
client.call("bridge", endpoint, params);

export const getAccounts = async (usernames) => await client.database.getAccounts(usernames);
  
export const getAccount = async (username) => await getAccounts([username]).then((resp) => resp[0]);

export const getCommunity = async (name, observer = "") => {
  try {
        const result = await bridgeApiCall("get_community", { name, observer });
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createHiveCommunity = async (username, communityName, keys) => {

    const operation = [
      "account_create",
      {
        fee: 3,
        creator: username,
        new_account_name: communityName,
        owner: {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[keys.ownerPubkey, 1]]
        },
        active: {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[keys.activePubkey, 1]]
        },
        posting: {
          weight_threshold: 1,
          account_auths: [["spk-network", 1]],
          key_auths: [[keys.postingPubkey, 1]]
        },
        memo_key: keys.memoPubkey,
        json_metadata: ""
      }
    ];
  
    try {
      await keychainBroadcast(username, [operation], "Active");
    } catch (error) {
     console.log(error)
      return;
    }
  
  };

export const getCommunities = (last = "", limit = 100, query = null, sort = "rank", observer = "") => {
    return bridgeApiCall("list_communities", {
      last: last,
      limit: limit,
      query: query,
      sort: sort,
      observer: observer
    });
  };
  