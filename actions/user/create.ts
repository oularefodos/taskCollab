'use server'

import { createErrorObject } from "@/helpers/shard";
import { ErrorObject, SuccesObject } from "@/interfaces/action";
import { registerValidator } from "@/interfaces/user";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { asyncWrapper } from "@/helpers/asyncWrapper";

//

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
  const role = "USER";

  // check existing user with this email
  const userByEmail = await prisma.user.findUnique({ where: { email } });
  if (userByEmail) {
    return createErrorObject("this email already exits");
  }

  // generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  // create new user
  await prisma.user.create({
    data: {
      email,
      password: passwordHashed,
      role,
    },
  });
  return { success: true, message: "you have been registered" };
};

export const createUser = asyncWrapper(withoutWrapper)