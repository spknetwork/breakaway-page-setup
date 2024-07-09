export const keychainBroadcast = (account, operations, key, rpc = null) => {
    return new Promise((resolve, reject) => {
      window.hive_keychain?.requestBroadcast(
        account,
        operations,
        key,
        (resp) => {
          if (!resp.success) {
            reject(resp);
          }
          resolve(resp);
        },
        rpc
      );
    });
  };

export const addAccountTokeychain = (username, keys) => new Promise((resolve, reject) => {
  if (window.hive_keychain) {
      window.hive_keychain.requestAddAccount(username, keys, (resp) => {
          if (!resp.success) {
              reject({ message: "Operation cancelled" });
          }
          resolve(resp);
      });
  } else {
      reject({ message: "Hive Keychain not available" });
  }
});

export const keychainPostingJSON = (username, type, json) => {
  return new Promise((resolve, reject) => {
    if (window.hive_keychain) {
      window.hive_keychain.requestCustomJson(
        username,
        type,
        "Posting",
        JSON.stringify(json),
        "Update Community",
        (response) => {
          if (response.success) {
            resolve(response);
          } else {
            reject(response.error);
          }
        }
      );
    } else {
      reject(new Error("Hive Keychain extension is not installed."));
    }
  });
};
