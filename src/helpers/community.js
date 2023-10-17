import { PrivateKey } from "@hiveio/dhive";

export const getPrivateKeys = (username, password) => {
  const roles = ["owner", "active", "posting", "memo"];
  
  let privKeys = {
    owner: "",
    active: "",
    posting: "",
    memo: "",
    ownerPubkey: "",
    activePubkey: "",
    postingPubkey: "",
    memoPubkey: ""
  };

  roles.forEach((role) => {
    privKeys[role] = PrivateKey.fromLogin(username, password, role).toString();
    privKeys[`${role}Pubkey`] = PrivateKey.from(privKeys[role]).createPublic().toString();
  });

  return privKeys;
};  

export const arrayToHex = (array) => {
  return Array.from(array, (byte) => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}
  
export const generatePassword = async (length) => {
  if (typeof window.crypto !== "undefined" && typeof window.crypto.getRandomValues === "function") {
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    const password = `P${PrivateKey.fromSeed(arrayToHex(randomValues)).toString()}`;
    return password;
  } else {
    throw new Error("crypto.getRandomValues is not supported in this browser.");
  }
};

export const  genCommuninityName = () => {
  return `hive-${Math.floor(Math.random() * 100000) + 100000}`;
};
