import { ErrorType } from "./shard"

export type ActionReturnType<T> = {
    error? : ErrorType,
    message? : string,
    data? : T
}

export type ActionFunctionType= (e? : FormData) => any