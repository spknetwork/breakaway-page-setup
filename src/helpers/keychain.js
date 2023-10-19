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
