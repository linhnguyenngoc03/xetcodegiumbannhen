
export interface UseLoginBody<T> {
    email?: string,
    password?: string
    auth?: T,
    userUid?: string
}