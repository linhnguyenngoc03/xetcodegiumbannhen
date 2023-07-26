import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { FetcherProps, fetcher } from "../../fetcher";
import { UseLoginBody } from "../../model/api/auth/login";
import { ResponseBody } from "../../model/api";
import { User } from "../../model/user";

export const UseLogin = async ({ email, password, auth, userUid }: UseLoginBody<Auth>) => {
    if (email !== undefined && password !== undefined && auth !== undefined && userUid === undefined) {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const url = `/api/auth/login`;
        const props: FetcherProps = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                userUid: response.user.uid
            },
            options: {
                next: {
                    revalidate: 60,
                }
            },
        };
        const data: ResponseBody<User> = await fetcher(url, props)
        return data
    } else if (userUid !== undefined) {
        const url = `http://localhost:3000/api/auth/login`;
        const props: FetcherProps = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: {
                userUid: userUid
            },
            options: {
                next: {
                    revalidate: 60,
                }
            },
        };
        const data: ResponseBody<User> = await fetcher(url, props)
        return data
    } else {
        return {
            data: null,
            message: "error",
            status: "error"
        }
    }
};
