import { AuthProvider } from "firebase/auth";

export interface UseLoginGoogleBody<T> {
    auth: T,
    provider: AuthProvider
}