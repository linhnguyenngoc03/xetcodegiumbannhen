import { Auth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseLoginBody } from "../../model/api/auth/login";
import { UseLoginGoogleBody } from "../../model/api/auth/loginGoogle";
import { User } from "../../model/user";

export const UseLoginGoogle = async ({ auth, provider }: UseLoginGoogleBody<Auth>) => {
        const response = await signInWithPopup(auth, provider)
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
    
};
