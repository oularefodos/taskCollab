"use server";
import prisma from "@/prisma/db";
import { ErrorObject } from "@/interfaces/action";
import { SuccesObject } from "@/interfaces/action";
import { createErrorObject } from "@/helpers/shard";
import { userIsAuthenticated } from "@/helpers/shard";
import { organizationValidator } from "@/interfaces/Organisation";
import { asyncWrapper } from "@/helpers/asyncWrapper";

const withouWrapper = async (
  data: FormData
): Promise<ErrorObject | SuccesObject<{ id: string }>> => {
  const userId = await userIsAuthenticated();
  if (!userId) {
    return createErrorObject("require authentication");
  }
  const response = await organizationValidator.parse({
    name: data.get("name"),
    description: data.get("description"),
  });
  const { name, description } = response;
  const newOrganisation = await prisma.organisation.create({
    data: {
      name,
      description,
      ownerId: userId,
    },
  });
  return {
    message: "you created a new Organisation",
    data: {
      id: newOrganisation.id,
    },
    success: true,
  };
};

export const createOrganization = asyncWrapper(withouWrapper)
