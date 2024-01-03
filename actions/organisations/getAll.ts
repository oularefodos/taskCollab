"use server";

import { OrganizationType } from "@/interfaces/Organisation";
import { asyncWrapper } from "@/helpers/asyncWrapper";
import { createErrorObject, userIsAuthenticated } from "@/helpers/shard";
import { ErrorObject, SuccesObject } from "@/interfaces/action";
import prisma from "@/prisma/db";

 const withoutWrapper = async () : Promise<ErrorObject | SuccesObject<OrganizationType[]>> => {
  const userId = await userIsAuthenticated();
    if (userId === null) {
      return createErrorObject('require authentication');
    }
    const organizations  = await prisma.organisation.findMany({
      where: {
        ownerId: userId,
      },
    }) as OrganizationType[];
    return { 
      message : 'success',
      success : true,
      data : organizations
    };
};

export const getOrganizations = asyncWrapper(withoutWrapper)