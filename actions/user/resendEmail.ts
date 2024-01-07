'use server'

import { userIsAuthenticated } from "@/helpers/shard";
import { createErrorObject } from "@/helpers/shard";
import prisma from "@/prisma/db";
import { sendVericationToken } from "@/helpers/shard";
import { asyncWrapper } from "@/helpers/asyncWrapper";

const withoutWrapper = async () => {
  // check if the user already authenticated
  const userId = await userIsAuthenticated();
  if (!userId) {
    return createErrorObject("require authentication");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.password || user.emailVerified) {
    return createErrorObject(" User already verified ");
  }

  sendVericationToken(user.email, user.id);
  return {
    success: true,
    message: "Message is sent to your email",
  };
};

export const resendEmail = asyncWrapper(withoutWrapper)
