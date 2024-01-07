'use server'
import { getverificationTokenByToken } from "@/helpers/shard";
import { createErrorObject } from "@/helpers/shard";
import prisma from "@/prisma/db";
import { asyncWrapper } from "@/helpers/asyncWrapper";
import * as z from 'zod'

const tokenValidator = z.object({
    token : z.string()
})

const withoutWrapper = async (formData : FormData) => {

  const { token } = tokenValidator.parse({
    token : formData.get('token')
  })

  
  const verificationToken = await getverificationTokenByToken(token);

  console.log(verificationToken)

  const current = new Date();
  if (!verificationToken || verificationToken.expires < current ) {
    return createErrorObject(" Invalid Token Or Expired, login end resend a new one");
  }

  const userId = verificationToken.identifier;

  const user = await prisma.user.findUnique({where : {
    id : userId
  }});

  if (!user) {
    return createErrorObject("Invalid Token");
  }

  await prisma.user.update({
    where : {
        id : userId
    },
    data : {
        emailVerified : true,
    }
  })

  await prisma.verificationToken.delete({
    where : { token }
  });

  return { success: true, message: "your account is verified" };

};

export const verifyToken = asyncWrapper(withoutWrapper)