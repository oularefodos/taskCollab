import * as z from "zod";

export const organizationValidator = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "require more at leat 2 letters" })
    .toLowerCase(),
  description: z.string().optional(),
});

export type OrganizationType = z.infer<typeof organizationValidator> & {id : string};

