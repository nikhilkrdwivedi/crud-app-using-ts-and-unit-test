import TodoModel from "../models/todos";

export const create = async (payload: any = {}) => {
  try {
    const result = await TodoModel.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

export const update = async (query: any = {}, payload: any = {}) => {
  try {
    const result = await TodoModel.findOneAndUpdate(query, payload, {
      new: true,
    }).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetch = async (
  query: any,
  skip: number = 0,
  limit: number = 0
) => {
  try {
    const result = await TodoModel.find(query).skip(skip).limit(limit).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchById = async (_id: string, optional: any = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await TodoModel.findOne(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (_id: string, optional: any = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await TodoModel.findOneAndUpdate(
      query,
      {
        isActive: false,
      },
      { new: true }
    ).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const countDocuments = async (query: any = {}) => {
  try {
    const result = await TodoModel.countDocuments(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};
