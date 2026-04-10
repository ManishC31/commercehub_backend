import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createUser, getUserByEmail } from "../services/user.service.ts";
import { ApiError, ApiResponse } from "../utils/responses.util.ts";
import { getAuthToken, validatePassword } from "../services/auth.service.ts";
import { pool, withTransaction } from "../configs/db.config.ts";

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await withTransaction(async (client) => {
    const existingUser = await getUserByEmail(client, req.body.email);

    if (existingUser) {
      ApiError(res, "User with email already exists", 400);
    }

    // create and return new user
    return await createUser(client, req.body);
  });

  // create new token
  const token = await getAuthToken(newUser.id, req.body.email);

  // set into cookie
  const cookieExpiryMs = Number(process.env.COOKIE_EXPIRY ?? 3600000); // 1h fallback

  res.cookie("token", token, {
    maxAge: cookieExpiryMs,
    httpOnly: true,
  });

  ApiResponse(res, "User created successfully", 201, { id: newUser.id, email: newUser.email, name: newUser.name, token });
});

export const loginUserController = asyncHandler(async (req: Request, res: Response) => {
  const existingUser = await getUserByEmail(pool, req.body.email);

  if (!existingUser) {
    ApiError(res, "User logged in successfully", 400);
  }

  // validate password
  const isValidPassword = await validatePassword(req.body.password, existingUser.password);

  if (!isValidPassword) {
    ApiError(res, "Email & password are not matching", 400);
  }

  const token = await getAuthToken(existingUser.id, req.body.email);

  // set into cookie
  const cookieExpiryMs = Number(process.env.COOKIE_EXPIRY ?? 3600000); // 1h fallback

  res.cookie("token", token, {
    maxAge: cookieExpiryMs,
    httpOnly: true,
  });

  ApiResponse(res, "User logged in successfully", 200, { id: existingUser.id, email: existingUser.email, name: existingUser.name, token });
});

export const logoutUserController = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");
  ApiResponse(res, "User logged out successfully", 200);
});
