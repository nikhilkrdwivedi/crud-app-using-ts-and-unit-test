import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginType } from "../types/authentication";
import httpResponseMessages from "../constants/httpResponseMessages";
import environment from "../configurations/environment";

import { fetchOne, update, create } from "../providers/authentications";
import { AUTH_CONSTANTS } from "../constants/authentications";
import { transformUserToReturnToClient } from "../helpers/authentication";
import { CustomRequest } from "../types/customRequest";

export const login = async (request: Request, response: Response) => {
  try {
    const loginUser = request.body;
    let query: LoginType = {
      email: loginUser.email,
    };

    //get user data
    const user = await fetchOne(query);
    if (!user) {
      return response.status(400).json({
        success: true,
        message: httpResponseMessages.LOGIN_ERROR,
        data: loginUser,
      });
    }

    // compare passwords
    const match = bcrypt.compareSync(loginUser.password, user.password);
    if (!match) {
      return response.status(400).json({
        success: true,
        message: httpResponseMessages.LOGIN_ERROR,
        data: loginUser,
      });
    }
    // token issue with validation
    const token = jwt.sign({ userId: user._id }, environment.JWT_SECRET, {
      expiresIn: AUTH_CONSTANTS.expiresIn,
    });

    let updatedUser = await update(
      { _id: user._id },
      { $addToSet: { tokens: token } }
    );
    updatedUser = transformUserToReturnToClient(updatedUser);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.LOGIN_SUCCESS,
      data: {
        user: updatedUser,
        token,
      },
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

const extractTokenFromHeader = (request: Request) => {
  if (
    request.headers.authorization &&
    request.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return request.headers.authorization.split(" ")[1];
  }
  return undefined;
};

export const logout = async (request: CustomRequest, response: Response) => {
  try {
    let token = extractTokenFromHeader(request);
    if (!token) {
      return response.status(400).json({
        success: false,
        message: httpResponseMessages.LOGOUT_DENIED,
        error: null,
      });
    }
    token = token.replace(/\"/g, "");
    const { allDeviceLogout } = request.body || false;
    const user = request.user;
    const isValidToken = jwt.verify(token, environment.JWT_SECRET);
    if (!isValidToken) {
      return response.status(400).json({
        success: false,
        message: httpResponseMessages.ACCESS_DENIED,
        error: null,
      });
    }
    let updatePayload = { $pull: { tokens: token } } as any;
    if (allDeviceLogout) {
      updatePayload = { $set: { tokens: [] } };
    }
    await update({ _id: user?._id }, updatePayload);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.LOGOUT_SUCCESS,
      data: {},
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const validateToken = async (request: Request, response: Response) => {
  try {
    let token = extractTokenFromHeader(request);

    if (!token) {
      return response.status(400).json({
        success: false,
        message: httpResponseMessages.LOGOUT_DENIED,
        error: null,
      });
    }

    token = token.replace(/\"/g, "");

    const isValidToken: any = jwt.verify(token, environment.JWT_SECRET);

    if (!isValidToken) {
      return response.status(400).json({
        success: false,
        message: httpResponseMessages.ACCESS_DENIED,
        error: null,
      });
    }
    const { userId } = isValidToken;
    let user = await fetchOne({
      _id: userId,
      tokens: token,
    });

    if (!user) {
      return response.status(400).json({
        success: false,
        message: httpResponseMessages.ACCESS_DENIED,
        error: null,
      });
    }
    user = transformUserToReturnToClient(user);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.VALID_TOKEN,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const register = async (request: Request, response: Response) => {
  try {
    const registerUser = request.body;
    //password check
    if (!AUTH_CONSTANTS.passwordRegex.test(registerUser.password)) {
      return response.status(400).json({
        success: false,
        message: httpResponseMessages.INVALID_PASSWORD_ERROR,
        error: registerUser,
      });
    }
    //user existence check
    const checkUser = await fetchOne({ email: registerUser.email });
    console.log("checkUser ", checkUser);
    if (checkUser) {
      return response.status(409).json({
        success: false,
        message: httpResponseMessages.USER_ALREADY_EXIST,
        error: registerUser,
      });
    }

    // user creation test
    const password = bcrypt.hashSync(
      registerUser.password,
      AUTH_CONSTANTS.saltRounds
    );
    registerUser.password = password;
    const user = await create(registerUser);

    // token issue with validation
    const token = jwt.sign({ userId: user._id }, environment.JWT_SECRET, {
      expiresIn: AUTH_CONSTANTS.expiresIn,
    });

    // add token to user token mapping
    let updatedUser = await update(
      { _id: user._id },
      { $addToSet: { tokens: token } }
    );
    updatedUser = transformUserToReturnToClient(updatedUser);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.USER_CREATED,
      data: { user: updatedUser, token },
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export default { login, logout, validateToken, register };
