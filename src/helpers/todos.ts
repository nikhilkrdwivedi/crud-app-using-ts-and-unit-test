import { TODOS_BLACKLIST_KEYS_FOR_UPDATE } from "../constants/todos";

export const transformTodoUpdatePayload = (payload: any) => {
  TODOS_BLACKLIST_KEYS_FOR_UPDATE.forEach((key) => delete payload[key]);
  return payload;
};

export default { transformTodoUpdatePayload };
