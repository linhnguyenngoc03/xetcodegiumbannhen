import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { User } from "../../model/user";
import { UseRegisterBody } from "../../model/api/auth/register";

export const UseRegister = async ({ email, userName, address, phoneNumber, auth, password }: UseRegisterBody<string | undefined>) => {
    const url = `/api/auth/register`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {
            email,
            password,
            auth,
            userName,
            phoneNumber,
            address
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
