export const AUTH_CONSTANTS = {
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/,
  expiresIn: "90d",
  saltRounds: 10,
};
export const BLACKLIST_KEYS_FOR_RETURN_USER = ["tokens", "password"];

export default {
  AUTH_CONSTANTS,
  BLACKLIST_KEYS_FOR_RETURN_USER,
};
