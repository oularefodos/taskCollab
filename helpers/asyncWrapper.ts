import * as z from "zod";
import { createErrorObject } from "./shard";


export const asyncWrapper = (fnct: Function) => {
    return async (e : FormData) => {
        try {
          return await fnct(e);
        } catch (error) {
          if (error instanceof z.ZodError) {
            return createErrorObject(error.flatten().fieldErrors.name!);
          } else {
            return createErrorObject('something went wrong');
          }
        }
    }
};

