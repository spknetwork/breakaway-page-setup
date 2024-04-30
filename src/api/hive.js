import { keychainBroadcast, addAccountTokeychain } from "../helpers/keychain";
import { SERVERS } from "../constants/servers";

import { Client, PrivateKey } from "@hiveio/dhive";

const client = new Client(SERVERS, {
  timeout: 3000,
  failoverThreshold: 3,
  consoleOnFailover: true,
});

const bridgeApiCall = (endpoint, params) =>
  client.call("bridge", endpoint, params);

export const getAccounts = async (usernames) =>
  await client.database.getAccounts(usernames);

export const getAccount = async (username) =>
  await getAccounts([username]).then((resp) => resp[0]);

export const getCommunity = async (name, observer = "") => {
  try {
    const result = await bridgeApiCall("get_community", { name, observer });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const listAllSubscriptions = async (name) => {
  try {
    const result = await bridgeApiCall("list_all_subscriptions", {
      account: name,
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createHiveCommunity = async (username, communityName, keys) => {
  return new Promise(async (resolve, reject) => {
    const op_name = "account_create";
    const memoKey = keys.memo;
    const activeKey = keys.active;
    const postingKey = keys.posting;

    const owner = {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.ownerPubkey, 1]],
    };
    const active = {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[keys.activePubkey, 1]],
    };
    const posting = {
      weight_threshold: 1,
      account_auths: [["ecency.app", 1]],
      key_auths: [[keys.postingPubkey, 1]],
    };

    const ops = [];
    const params = {
      creator: username,
      new_account_name: communityName,
      owner,
      active,
      posting,
      memo_key: keys.memoPubkey,
      json_metadata: "",
      extensions: [],
      fee: "3.000 HIVE",
    };

    const operation = [op_name, params];
    ops.push(operation);

    try {
      const response = await keychainBroadcast(username, [operation], "Active");
      if (response) {
        resolve(response);
      } else {
        reject("Account creation failed");
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }

    try {
      await addAccountTokeychain(communityName, {
        active: activeKey,
        posting: postingKey,
        memo: memoKey,
      });
    } catch (error) {
      console.log(error);
    }
  });
};

export const getCommunities = (
  last = "",
  limit = 1000,
  query = null,
  sort = "rank",
  observer = ""
) => {
  return bridgeApiCall("list_communities", {
    last: last,
    limit: limit,
    query: query,
    sort: sort,
    observer: observer,
  });
};

export const subscribe = async (username, community) => {
  const json = ["subscribe", { community }];
  const result = await broadcastPostingJSON(username, "community", json);
  console.log(username, community);
  return result;
};

export const broadcastPostingJSON = (username, id, json) => {
  const postingKey = "key";
  if (postingKey) {
    const privateKey = PrivateKey.fromString(postingKey);

    const operation = {
      id,
      required_auths: [],
      required_posting_auths: [username],
      json: JSON.stringify(json),
    };

    return client.broadcast.json(operation, privateKey);
  }
};

export const updateCommunity = (username, community, props) => {
  const json = ["updateProps", { community, props }];

  return broadcastPostingJSON(username, "community", json);
};

export const setUserRole = (username, community, account, role) => {
  const json = ["setRole", { community, account, role }];

  return broadcastPostingJSON(username, "community", json);
};
