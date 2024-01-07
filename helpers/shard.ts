import { ErrorObject } from "@/interfaces/action";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/db";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { confirmMessageTemplate } from "@/helpers/templates";

/**
 * Create a Error Object if is not correct in my server action
 * @param message
 * @returns
 */
export const createErrorObject = (message: string | string[]): ErrorObject => {
  return {
    success: false,
    message: message,
  };
};

/**
 * verify if a user is authenticated
 * @returns
 */
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

/**
 * get a user by its email
 * @param email
 * @returns
 */
export const getUserByEmail = async (email: string) => {
  const userByEmail = await prisma.user.findUnique({ where: { email } });
  return userByEmail;
};

/**
 * get a user by its id
 * @param id
 * @returns
 */
export const getUserById = async (id: string) => {
  const userByEmail = await prisma.user.findUnique({ where: { id } });
  return userByEmail;
};

/**
 * generate a new verication id
 * @param id
 * @returns
 */
export const generateEmailVerifieldToken = async (id: string) => {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { identifier: id },
  });
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        identifier: id,
      },
    });
  }
  const newToken = uuidv4();
  const newEnailToken = await prisma.verificationToken.create({
    data: {
      identifier: id,
      token: newToken,
      expires: new Date(Date.now() + 3600000),
    },
  });
  return newEnailToken;
};

/**
 * get verificationToken by its id
 * @param id
 * @returns
 */
export const getverificationTokenById = async (id: string) => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { identifier: id },
  });
  return verificationToken;
};

/**
 * get verificationToken by its token
 * @param id
 * @returns
 */
export const getverificationTokenByToken = async (token: string) => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  console.log(token, "token");
  return verificationToken;
};

/**
 * this function has to send an email to specific user
 * @param receiverEmail
 * @param subject
 * @param message
 */
export const sendEmail = (
  receiverEmail: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendVericationToken = async (email: string, id: string) => {
  const newToken = await generateEmailVerifieldToken(id);
  const link = `${process.env.URL}/verifyToken/${newToken.token}`;
  sendEmail(email, "Testing", confirmMessageTemplate(link));
};
