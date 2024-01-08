'use server'

import { getUserByEmail, sendEmail } from "@/helpers/shard";
import { createErrorObject } from "@/helpers/shard";
import { asyncWrapper } from "@/helpers/asyncWrapper";
import { emailValidator } from "@/interfaces/user";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/prisma/db";
import { passwordTokenTemplate } from "@/helpers/templates";


const generatePasswordToken = async(id : string) => {
    
    const existingToken = await prisma.passwordToken.findUnique({
        where: { identifier: id },
    });
    if (existingToken) {
        await prisma.passwordToken.delete({
            where: {
                identifier: id,
            },
        });
    }
      const newToken = uuidv4();
      const newEnailToken = await prisma.passwordToken.create({
        data: {
          identifier: id,
          token: newToken,
          expires: new Date(Date.now() + 3600000),
        },
      });
      return newEnailToken;
}

const withoutWrapper = async (e : FormData) => {
  // check if the user already authenticated


  const { email } = emailValidator.parse({
    email : e.get('email')
  });

  const user = await getUserByEmail(email);

  if (!user) {
    return createErrorObject("this email is not associated to an account");
  }

  if (!user.password) {
    return createErrorObject("This account is associated to google a account");
  }
  
  const passwordToken = await generatePasswordToken(user.id);
  const { token } = passwordToken
  const template = passwordTokenTemplate(`${process.env.URL}/passwordRenew/${token}`);
  sendEmail(email, 'Forgetten Password', template);
  return {
    success: true,
    message: "Message is sent to your email",
  };
};

export const sendPasswordToken = asyncWrapper(withoutWrapper)