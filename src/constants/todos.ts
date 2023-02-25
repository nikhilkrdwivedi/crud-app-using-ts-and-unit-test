export const TODOS_WHITELIST_KEYS_FOR_UPDATE = [];
export const TODOS_BLACKLIST_KEYS_FOR_UPDATE = [
  "_id",
  "__v",
  "status",
  "isActive",
  "author",
  "completionDate",
];

export default {
  TODOS_WHITELIST_KEYS_FOR_UPDATE,
  TODOS_BLACKLIST_KEYS_FOR_UPDATE,
};
