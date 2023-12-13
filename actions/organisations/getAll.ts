"use server";

import { nextAuthConfig } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";

export const getOrganizations = async () => {
  try {
    const session = await getServerSession(nextAuthConfig);
    if (!session?.user) {
      return { error: "required aiuthentication" };
    }
    const user = session.user;
    const userByEmail = await prisma.user.findUnique({
      where: {
        email: user.email!,
      },
    });
    if (!userByEmail) {
      return { error: "no user like that" };
    }
    const organizations = await prisma.organisation.findMany({
      where: {
        ownerId: userByEmail.id,
      },
    });
    return { data: organizations };
  } catch (error) {
    return { error: "something went wrong" };
  }
};
