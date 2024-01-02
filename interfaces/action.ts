export interface ErrorObject {
    success : false,
    message : string | string[]
}

export interface SuccesObject<T> {
    success : true,
    data? : T,
    message : string
}