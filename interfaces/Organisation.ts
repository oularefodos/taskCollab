import * as z from 'zod'

export const organizationValidator = z.object({
    name : z.string().min(4, {message : 'require more at leat 2 letters'}),
    description : z.string().optional()
})