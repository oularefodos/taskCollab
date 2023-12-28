'use server'
import { nextAuthConfig } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod'

const schema = z.object({
    name : z.string().min(3, { message : 'required more than 3 letters'}),
    description : z.string()
})

export const createOrganization = async (data : FormData) => {

    const response = schema.safeParse({
        name : data.get('name'),
        description : data.get('description')
    })

    if (!response.success) {
        return {
            error : response.error.flatten().fieldErrors,
            message : 'Missing fields'
        }
    }

    try {
        const session = await getServerSession(nextAuthConfig);
        if (!session?.user) {
            return {
                error : {
                    name : ['required to be authenticated']
                },
                message : 'Permission denied'
            }
        }
        const {name, description} = response.data;
        const data = session.user
        const userByEmail = await prisma.user.findUnique({where : {email : data.email!}});
        if (!userByEmail) {
            return {
                error : {
                    name : ['No user like that']
                },
                message : 'Permission denied'
            }
        }
        const newOrganisation = await prisma.organisation.create(
            {
                data : {
                    name,
                    description,
                    ownerId : userByEmail.id
                }
            }
        )
        return {
            message : 'you created a new Organisation',
            id : newOrganisation.id
        }
    } catch (error : any) {
        return {error : 'something went wrong'}
    }
}  
