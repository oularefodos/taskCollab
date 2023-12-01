import { NextResponse, NextRequest } from "next/server"
import bcrypt from 'bcrypt'
import prisma from "@/prisma/db";

export async function POST(req : NextRequest) {
    try { 
        const userData = await req.json()
        const {username, email} = userData;
        const role = 'USER'
        /** check if the email exists */
        const userByEmail = await prisma.user.findUnique({where : {email}});
        if (userByEmail) {
            return NextResponse.json(
                {message : "this email already exists"},
                {status : 401}
            );
        }
        /** check if the username exists */
        const userByUsername = await prisma.user.findUnique({where : {username}});
        if (userByUsername) {
            return NextResponse.json(
                {message: "this username already exists"},
                {status: 401}
            )
        }
        /** generate a salt and hash the password */
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(userData.password, salt);
        /** create a new user */
        const newUser = await prisma.user.create({
            data : {
                email,
                username,
                password : passwordHashed,
                role
            }
        });
        const {password, ...userWithoutPassword} = newUser
        return NextResponse.json(
            {message : 'user created successfully', user : userWithoutPassword},
            {status : 200}
        );
    } catch (error) {
        return NextResponse.json(
            {message : 'something goes wrong'},
            {status : 500}
        )
    }
}