'use server'

import * as z from "zod";
import { createErrorObject } from "./shard";


export const ZodErrorExtractor = (error : z.ZodError) => {
  const messages : string[] = []
  const errorData = error.flatten().fieldErrors;
  const listMessage = Object.values(errorData);
  listMessage?.forEach((list) => {
    list?.forEach(value => messages.push(value))
  })
  return messages;
}

export const asyncWrapper = (fnct: Function) => {
    return async (e? : FormData) => {
        try {
          return await fnct(e);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const messages = ZodErrorExtractor(error);
            return createErrorObject(messages);
          } else {
            console.log(error)
            return createErrorObject('something went wrong');
          }
        }
    }
};

