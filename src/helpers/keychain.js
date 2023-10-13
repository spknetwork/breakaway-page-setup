export const keychainBroadcast = (account, operations, key, rpc = null) => {
    return new Promise((resolve, reject) => {
      window.hive_keychain?.requestBroadcast(
        account,
        operations,
        key,
        (resp) => {
          if (!resp.success) {
            reject({ message: "Operation cancelled" });
          }
  
          resolve(resp);
        },
        rpc
      );
    });
  };
  