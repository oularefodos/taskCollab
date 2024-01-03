import { ErrorObject } from "@/interfaces/action";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/db";

// create an object for errors
export const createErrorObject = (message: string | string[]): ErrorObject => {
  return {
    success: false,
    message: message,
  };
};

// check if the user authenticated
export const userIsAuthenticated = async (): Promise<null | string> => {
  const session = await getServerSession(nextAuthConfig);
  if (!session?.user) {
    return null;
  }
  const user = session.user;
  const userByEmail = await prisma.user.findUnique({
    where: { email: user.email! },
  });
  if (!userByEmail) {
    return null;
  }
  return userByEmail.id;
};


