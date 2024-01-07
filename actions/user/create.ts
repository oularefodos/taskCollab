'use server'

import { createErrorObject, getUserByEmail } from "@/helpers/shard";
import { ErrorObject, SuccesObject } from "@/interfaces/action";
import { registerValidator } from "@/interfaces/user";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { asyncWrapper } from "@/helpers/asyncWrapper";
import { sendVericationToken } from "@/helpers/shard";


const withoutWrapper = async (
  e: FormData
): Promise<ErrorObject | SuccesObject<undefined>> => {

    // parse incomming data
  const userData = await registerValidator.parse({
    password: e.get("password"),
    email: e.get("email"),
  });
  const { email, password } = userData;

  // define user role

  // check existing user with this email
  const userByEmail = await getUserByEmail(email);
  if (userByEmail) {
    return createErrorObject("this email already exits");
  }

  // generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  // create new user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: passwordHashed,
    },
  });
  sendVericationToken(email, newUser.id);
  return { success: true, message: "you have been registered, we sent an email to active your account" };
};

export const createUser = asyncWrapper(withoutWrapper)