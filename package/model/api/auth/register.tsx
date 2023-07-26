
export interface UseRegisterBody<T> {
    email: string | null | undefined
    password?: string
    phoneNumber: string
    address: string
    userName: string
    auth: T
}