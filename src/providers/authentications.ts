import UserModel from "../models/users";

export const create = async (payload: any = {}) => {
  try {
    const result = await UserModel.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

export const update = async (query: any = {}, payload: any = {}) => {
  try {
    const result = await UserModel.findOneAndUpdate(query, payload, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetch = async (query: any) => {
  try {
    const result = await UserModel.find(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};
export const fetchOne = async (query: any) => {
  try {
    const result = await UserModel.findOne(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchById = async (_id: string, optional: any = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await UserModel.findOne(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (_id: string, optional: any = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await UserModel.findOneAndUpdate(
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
    const result = await UserModel.countDocuments(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};
