import { ActionFunctionType } from "@/interfaces/action";
import * as z from 'zod'

export const asyncWrapper = async (fnct : any) => {
    return async (e : FormData) => {
        try {
            await fnct(e)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    error : error.flatten().fieldErrors,
                    message : 'Missing fields'
                }
            } else {
                return {error : { name : ['something went wrong']}}
            }
        }
    }
}